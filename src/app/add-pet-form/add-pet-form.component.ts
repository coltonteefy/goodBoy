import {Component, OnInit} from '@angular/core';
import {PetInfoService} from "../services/pet-info.service";
import {PetsComponent} from "../pets/pets.component";

@Component({
  selector: 'app-add-pet-form',
  templateUrl: './add-pet-form.component.html',
  styleUrls: ['./add-pet-form.component.css'],
})
export class AddPetFormComponent implements OnInit {
  // add stevie pic
  // https://i.kinja-img.com/gawker-media/image/upload/s--4p-SyaD6--/c_scale,fl_progressive,q_80,w_800/txtozmzikrdz1cmswjt4.jpg
  // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJCqloOub7mjnQN642eZl5b6--cZA9bCIbF2djsa8iu49b4ZCGWg
  // https://dogfood.guru/wp-content/uploads/2017/06/1200px-Akita_Inu_dog.jpg
  pic:string;
  name:string;
  age:number;
  gender:string;
  medication:string;

  newPetInfo = {};

  constructor(private petInfoService:PetInfoService, private petComponent: PetsComponent) {
  }

  ngOnInit() {
  }

  submitNewPet() {
    this.petInfoService.finishPetLoad.next(false);
    console.log(this.pic, "PIC");
    if(this.pic == undefined) {
      this.pic = './assets/images/no-pic.png';
    }

    console.log(this.pic, "PIC");
    if( this.name != "" && this.age != null && this.gender != "") {
      this.name = this.name.charAt(0).toUpperCase() + this.name.substring(1,this.name.length);
      this.newPetInfo = {
        pic: this.pic,
        name: this.name,
        age: this.age,
        gender: this.gender,
        medication: this.medication
      };

      this.petInfoService.petInfo[0].pets.push(this.newPetInfo);
      this.petInfoService.finishPetLoad.next(true);
      this.pic = "";
      this.name = "";
      this.age = 0;
      this.gender = "";
      this.medication = "";

      this.petComponent.hidePetForm = 'hide';
    }
  }
}
