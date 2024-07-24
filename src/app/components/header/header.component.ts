import {
    Component,
    OnInit,
    Inject,
    PLATFORM_ID,
    OnDestroy,
} from '@angular/core'
import { LoginComponent } from '../../pages/login/login.component'
import { AuthService } from '../../services/auth.service'
import { isPlatformBrowser } from '@angular/common'

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [LoginComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor(
        private authService: AuthService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}
    token: string | null = null

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.token = this.authService.getToken()
        }
        console.log(this.token)
    }
    ngOnDestroy(): void {
        this.token = null
    }
}
