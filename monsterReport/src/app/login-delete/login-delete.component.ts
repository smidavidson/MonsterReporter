import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { Router } from '@angular/router'
import { MonsterMarkersService } from '../monster-markers.service';

@Component({
    selector: 'app-login-delete',
    templateUrl: './login-delete.component.html',
    styleUrls: ['./login-delete.component.css']
})
export class LoginDeleteComponent {
    id:number
    deleteForm: FormGroup
    showDeletedText: boolean = false
    showWrongPasswordText: boolean = false
    md5hash:string = 'fcab0453879a2b2281bc5073e3f5fe54'
    isDeleted: boolean = false

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private monsterMarkersService: MonsterMarkersService) {
        this.id = activatedRoute.snapshot.params['id']
        console.log(this.id)

        this.monsterMarkersService = monsterMarkersService

        let formControls = {
            password: new FormControl('', [
                Validators.required,
            ])
        }

        this.deleteForm = new FormGroup(formControls)
    }

    onSubmit(password: {password:string}) {
        let passwordReturned:string = ""

        this.monsterMarkersService.checkPassword(password.password)
        .subscribe(data => {
            if (data.Digest == this.md5hash) {
                console.log("Correct Password found")
                this.deleteMonster()
                this.showDeleted()
            } else {
                console.log("Wrong password")
                this.showWrongPassword()
            }
        })

        this.deleteForm.reset()

    }

    showWrongPassword():void {
        this.showWrongPasswordText = true
        setTimeout(() => {
            this.showWrongPasswordText = false
        }, 2000)
    }

    showDeleted():void {
        this.showDeletedText = true
        setTimeout(() => {
            this.showDeletedText = false
        }, 2000)
    }

    deleteMonster(): void {
        console.log("onDelete() called")
        this.monsterMarkersService.deleteMonster(this.id)
        setTimeout(() => {
            this.router.navigate(['/map'])
        }, 2000)
    }

}
