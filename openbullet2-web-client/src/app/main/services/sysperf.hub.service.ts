import { Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { BehaviorSubject } from "rxjs";
import { PerformanceInfoDto } from "../dtos/info/performance-info.dto";
import { getBaseHubUrl } from "src/app/shared/utils/host";
import { UserService } from "./user.service";

@Injectable({providedIn: 'root'})
export class SysPerfHubService {
    private hubConnection: HubConnection | null = null;
    private metricsSource = new BehaviorSubject<PerformanceInfoDto | null>(null);
    public metrics$ = this.metricsSource.asObservable();

    constructor(private userService: UserService) {

    }

    createHubConnection() {
        this.hubConnection = new HubConnectionBuilder()
        .withUrl(getBaseHubUrl() + '/system-performance', {
            accessTokenFactory: () => this.userService.getJwt() ?? ''
        })
        .withAutomaticReconnect()
        .build();

        this.hubConnection
        .start()
        .catch(err => console.error(err));

        this.hubConnection.on('newMetrics', metrics => {
            this.metricsSource.next(metrics)
        });
    }

    stopHubConnection() {
        this.hubConnection
        ?.stop()
        .catch(err => console.error(err));
    }
}