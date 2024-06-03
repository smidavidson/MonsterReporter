import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Router } from '@angular/router'
import { MonsterMarkersService } from '../monster-markers.service';

@Component({
    selector: 'app-login-resolve',
    templateUrl: './login-resolve.component.html',
    styleUrls: ['./login-resolve.component.css']
})
export class LoginResolveComponent {
    id:number
    resolveForm: FormGroup
    showResolvedText: boolean = false
    showWrongPasswordText: boolean = false
    md5hash:string = 'fcab0453879a2b2281bc5073e3f5fe54'
    isResolved: boolean = false

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private monsterMarkersService: MonsterMarkersService) {
        this.id = activatedRoute.snapshot.params['id']
        console.log(this.id)

        this.monsterMarkersService = monsterMarkersService

        let formControls = {
            password: new FormControl('', [
                Validators.required,
            ])
        }

        this.resolveForm = new FormGroup(formControls)

    }

    onSubmit(password: {password:string}) {
        console.log("Submit pressed:")
        console.log(password)

        let passwordReturned:string = ""

        this.monsterMarkersService.checkPassword(password.password)
        .subscribe(data => {
            console.log("data: ")
            console.log(data)
            console.log(data.Digest)
            if (data.Digest == this.md5hash) {
                console.log("Password found")
                this.resolveMonster()
                this.showResolved()
            } else {
                console.log("Wrong password")
                this.showWrongPassword()
            }
        })

        console.log("returned password from service: ")
        console.log(passwordReturned)

        this.resolveForm.reset()

        setTimeout(() => {
            this.router.navigate(['/map'])
        }, 2000)
    }

    showWrongPassword():void {
        this.showWrongPasswordText = true
        setTimeout(() => {
            this.showWrongPasswordText = false
        }, 2000)
    }

    showResolved():void {
        this.showResolvedText = true
        setTimeout(() => {
            this.showResolvedText = false
        }, 2000)
    }

    resolveMonster():void {
        console.log("onResolveMonster() called")
        this.monsterMarkersService.resolveMonster(this.id)
    }
}


