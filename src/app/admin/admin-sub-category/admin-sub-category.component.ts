import { Component, OnInit } from '@angular/core';
import { ISubCategory } from 'src/app/shared/interfaces/subCategory.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { SubCategory } from 'src/app/shared/model/subCategory.model';

@Component({
  selector: 'app-admin-sub-category',
  templateUrl: './admin-sub-category.component.html',
  styleUrls: ['./admin-sub-category.component.scss']
})
export class AdminSubCategoryComponent implements OnInit {

  arrSubCategory: Array<ISubCategory> = [];
  nameNewSub: string;
  editStasus: boolean = false;
  editId: number;
  constructor(private SubCategService: SubCategoryService) { }

  ngOnInit(): void {
    this.getSubCategory();
  }
  getSubCategory(): void {
    this.SubCategService.getSubCategory().subscribe(data => {
      this.arrSubCategory = data;
    })
  }
  addNewSub(): void {
    const newSub: ISubCategory = new SubCategory(1, this.nameNewSub)
    if (this.arrSubCategory.length > 0) {
      newSub.id = this.arrSubCategory.slice(-1)[0].id + 1;
    }

    if (!this.editStasus) {
      this.SubCategService.addSubCategory(newSub).subscribe(() => {
        this.getSubCategory();
      })
    }
    else {
      newSub.id = this.editId;
      this.SubCategService.updataSubCategory(newSub).subscribe(() => {
        this.getSubCategory();
      })
    }
    this.editStasus=false;



  }
  deleteSubCategory(subCateg: ISubCategory): void {
    this.SubCategService.deleteSubCategory(subCateg).subscribe(() => {
      this.getSubCategory();
    })
  }
  edit(subCateg: ISubCategory): void {
    this.editId = subCateg.id;
    this.nameNewSub = subCateg.subName;
    this.editStasus=true;
  }

}
