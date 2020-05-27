import { Component, OnInit } from '@angular/core';
import { IAdminOrder } from 'src/app/shared/interfaces/orderAdmin.interface';
import { AdminOrdersService } from 'src/app/shared/services/admin-orders.service';
import { UserInformationService } from 'src/app/shared/services/user-information.service';
import { IUserInformation } from 'src/app/shared/interfaces/userInformation.interface';
import { UserInformation } from 'src/app/shared/model/userInformation.model';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.scss']
})
export class UserAboutComponent implements OnInit {
  userName: string;
  userPhone: string;
  userCity: string;
  userStreet: string;
  userHouse: string;
  userData: Array<IUserInformation>;
  userAllData: Array<IUserInformation>;
  userStatus: boolean = false;
  upDateID: number;
  addInformStatus:boolean=false;
  checkuserData:any;


  constructor(
    private userService: UserInformationService) { }

  ngOnInit(): void {
    this.getUserData();
    this.getAllUserData();
  }
  getUserData(): void {
    let userLocal = JSON.parse(localStorage.getItem('user'))
    this.userService.getUserData(userLocal.id).subscribe(data => {
      this.userData = data;
      this.checkuserData= this.userData.find(elem=>elem.userId==userLocal.id)
      if( this.checkuserData==undefined){
        this.addInformStatus=false
      }
      else{
        this.addInformStatus=true;
      }
     
    });
  }
  getAllUserData(): void {
    this.userService.getAllUserData().subscribe(data => {
      this.userAllData = data

    });
  }
  postDatauser(): void {
    
    let userLocal = JSON.parse(localStorage.getItem('user'))
    const newUser: IUserInformation = new UserInformation(1, userLocal.id,
      this.userName,
      this.userPhone,
      this.userCity,
      this.userStreet,
      this.userHouse,
      );

      
    if (!this.userStatus) {
      console.log(newUser)
      if (this.userAllData.length > 0) {
        
        newUser.id = this.userAllData.slice(-1)[0].id + 1;
      }
      this.userService.sendUserData(newUser).subscribe(() => {
        this.getUserData();
      });
      this.userStatus = false;
    }
    else {
      newUser.id = this.upDateID;
      this.userService.upDateUserData(newUser).subscribe(() => {
        this.getUserData();
      });
      this.userStatus = false;
    }
  }
  updateUserdata(): void {
    this.upDateID = this.userData[0].id;
    this.userName = this.userData[0].name;
    this.userPhone = this.userData[0].phone;
    this.userCity = this.userData[0].city;
    this.userStreet = this.userData[0].street;
    this.userHouse = this.userData[0].house;
    this.userStatus = true;
    this.addInformStatus=false;
  }
}

