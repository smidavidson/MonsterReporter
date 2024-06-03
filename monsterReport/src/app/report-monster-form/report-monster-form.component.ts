import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { MonsterModel } from '../models/monster-model';
import { MonsterMarkersService } from '../monster-markers.service';
import { LocationModel } from '../models/location-model';
import { Router } from '@angular/router'

@Component({
    selector: 'app-report-monster-form',
    templateUrl: './report-monster-form.component.html',
    styleUrls: ['./report-monster-form.component.css']
})
export class ReportMonsterFormComponent {
    reportForm: FormGroup
    http: HttpClient
    showReportedText: boolean = false
    locations:LocationModel[] = []
    newLocSelected:boolean
    setLocationText:string
    coord_x:number = 0;
    coord_y:number = 0;


    constructor(httpClient: HttpClient, private monsterMarkersService: MonsterMarkersService, private router: Router) {
        // Initialize HTTP client for GET POST requests (for onSubmit)
        this.http = httpClient
        this.newLocSelected = true;
        this.setLocationText = ""

        let formControls = {
            witness: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ]),
            phone_num: new FormControl('', [
                Validators.required,
                Validators.max(9999999999),
                Validators.min(1000000000)
            ]),
            monster: new FormControl('', [
                Validators.required,
                Validators.minLength(3)
            ]),
            location_name: new FormControl('', [
                // Validators.required
            ]),
            coord_x: new FormControl('', [
                this.decimalPlaceValidator as ValidatorFn
            ]),
            coord_y: new FormControl('', [
                this.decimalPlaceValidator as ValidatorFn
            ]),
            picture: new FormControl(),
            addInfo: new FormControl()
        }

        this.reportForm = new FormGroup(formControls, {validators: [this.formValidator]})

        this.monsterMarkersService.getLocations().subscribe( data => {
            this.locations = data
            console.log("Locations: ")
            console.log(this.locations)
        })

    }

    formValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

        if (this.newLocSelected) {
            if (!control.get("location_name")!.value) {
                return {form_error: true}
            }
            if (!control.get("coord_x")!.value) {
                return {form_error: true}
            }
            if (!control.get("coord_y")!.value) {
                return {form_error:true}
            }

            let location_name = control.get('location_name')!.value
            let coord_x = control.get('coord_x')!.value
            let coord_y = control.get('coord_y')!.value
            location_name = location_name.toLocaleLowerCase()
            location_name = location_name.replace(/ /g,"_");
    
            for (let loc of this.locations) {
                if (loc.coord_x == coord_x && loc.coord_y == coord_y) {
                    console.log("Location with coords already exists")
                    return { form_error: true }
                } 
                if (loc.location_name == location_name.toLocaleLowerCase()) {
                    console.log("Location already exists")
                    return { form_error: true }
                }
            }
            return null
        }
        return null
    }

    // Limit coordinates to 3 decimal places
    decimalPlaceValidator(control: FormControl) {
        if (!control.value) {
            return null
        }
        let textRep = control.value.toString()
        if (textRep.includes(".")) {
            let index = textRep.indexOf(".")
            console.log("current index:")
            console.log(index)
            if ((textRep.length - index - 1) > 3) {
                return {decimal_error: 'Your location is limited to 3 decimal places'}
            } else {
                return null;
            }
        }
        return null;
    }

    onSubmit(newMonster:any) {
        console.log("New Monster submitted: ")
        console.log(newMonster)
        newMonster.status = true

        let date:number = new Date().getTime()
        newMonster.time_reported = date;
        // let dataString: string = MonsterModel.formDataString(newMonster)

        
        let loc:LocationModel | null = this.findLoc(this.setLocationText.trim())
        if (loc) {
            console.log("appended coords: ")
            console.log(loc.coord_x)
            console.log(loc.coord_y)
            newMonster.coord_x = loc.coord_x
            newMonster.coord_y = loc.coord_y
            newMonster.location_name = loc.location_name
        }

        // console.log(newMonster)
        // Make inputted location lowercase and replace spaces with underscores
        newMonster.location_name = newMonster.location_name.toLocaleLowerCase().replace(/ /g,"_").trim();

        // Subscribe prints http response
        this.monsterMarkersService.addMonster(newMonster)

        // If new location selected, add to list
        if (this.newLocSelected) {
            
            this.monsterMarkersService.addLocation(newMonster.coord_x, newMonster.coord_y, newMonster.location_name)
        }



        // Reset report form inputs after submission
        this.reportForm.reset()

        setTimeout(() => {
            this.router.navigate(['/map'])
        }, 2000)

    }

    findLoc(location:string): LocationModel | null {
        console.log("Starting location search")
        console.log(location)
        for (let loc of this.locations) {
            if (loc.location_name == location) {
                console.log("Found location!")
                return loc;
            }
        }
        console.log("Could not find location :(")
        return null;
    }

    onSelect(evt:any) {
        console.log(evt.target.value)
        if (evt.target.value == "New Location") {
            console.log("newLocSet to true")
            this.newLocSelected = true;
            this.setLocationText = ""
        } else {
            console.log("newLocSet to false")
            this.newLocSelected = false;
            this.setLocationText = evt.target.value.toLocaleLowerCase().replace(/ /g,"_")
            console.log("Set location text: ")
            console.log(this.setLocationText)
        }
        console.log("it works")
        console.log(evt.target.value)
    }

    showReported() {
        this.showReportedText = true
        setTimeout(() => {
            this.showReportedText = false
        }, 2000)
    }




}
