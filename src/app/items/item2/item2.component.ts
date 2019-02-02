import { Component, OnInit, Input, Output, EventEmitter, HostListener, AfterViewInit, OnChanges } from '@angular/core';
import { Item } from '@shared/interfaces/item';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from '@environments/environment';
import { ManagementService } from '@shared/services/management.service';
import { Beer } from '@shared/interfaces/beer';
import { Items2Service } from '@shared/services/items2.service';
import { Brewery } from '@shared/interfaces/brewery';

@Component({
  selector: 'app-item2',
  templateUrl: './item2.component.html',
  styleUrls: ['./item2.component.css'],
  animations: [
  ]
})
export class Item2Component implements OnInit, AfterViewInit, OnChanges {
  @Input() item: Beer;
  @Input() editMode: boolean = false;
  @Input() movable: boolean = true;
  @Output() itemDeleted = new EventEmitter<{ item: Item }>()
  @Output() selected = new EventEmitter<Beer>()
  @Output() itemAdded = new EventEmitter<{ item: Item }>()
  @Output() itemEdited = new EventEmitter<{ item: Item }>()
  @Output() itemShiftUp = new EventEmitter<{ item: Item }>()
  @Output() itemShiftDown = new EventEmitter<{ item: Item }>()
  @Output() itemOut = new EventEmitter<{ item: Item }>()
  @Output() iconOff = new EventEmitter<{ company: string, filename: string }>()
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }
  screenWidth: number
  imgUrl: string;
  menuToggle: boolean = false;
  title: string
  displayIcon: string
  constructor(private storage: AngularFireStorage, private ms: ManagementService, private service: Items2Service) {
    this.onResize();
  }

  ngOnInit() {
    this.title = this.item.withBrewery ? this.item.brewery.name + " " + this.item.name : this.item.name
    let loadIcon = this.item.icon ? this.item.icon : this.item.brewery.icon
    this.getImage(loadIcon)
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {

  }

  getImage(name: string) {
    const ref = this.storage.ref(environment.itemIconRootAddress + name);
    ref.getDownloadURL()
      .toPromise()
      .then(value => {
        this.displayIcon = value;
      })
      .catch(e => {
        //console.log(name)
        this.displayIcon = '../../../assets/404icon.png'
        //this.iconOff.emit({ company: this.item.brewery.name, filename: name })
      })
  }

  onDelete() {
    //if (confirm("Are you sure you want to delete this Menu Item?") == true)
    //this.itemDeleted.emit({ item: this.item })
  }

  onAdd() {
    //this.itemAdded.emit({ item: this.item })
  }

  onEdit() {
    //this.itemEdited.emit({ item: this.item })
  }

  onShiftUp() {
    //this.itemShiftUp.emit({ item: this.item })
  }

  onShiftDown() {
    //this.itemShiftDown.emit({ item: this.item })
  }

  onOut() {
    //this.itemOut.emit({ item: this.item })
  }

  onClick() {
    //this.service.selectedBeer = this.item
    //console.log(this.item)
    this.selected.emit(this.item)
    //this.menuToggle == true ? this.menuToggle = false : this.menuToggle = true;
  }

  setTitleStyle() {
    let style = {
      // 'color': this.ms.itemTitleFontColor.value,
      // 'font-size': this.screenWidth <= 750 ? +this.ms.itemTitleFontSize.value / 2 + 'px' : this.ms.itemTitleFontSize.value + 'px',
      // 'font-family': this.ms.itemTitleFont.value,
      // 'text-shadow': this.ms.itemTitleShadow.value,
      // 'letter-spacing': this.ms.itemTitleLetterSpace.value + 'px',
    }
    return style
  }

  setNoteStyle() {
    let style = {
      // 'color': this.ms.itemNoteFontColor.value,
      // 'font-size': this.screenWidth <= 750 ? +this.ms.itemNoteFontSize.value / 2 + 'px' : this.ms.itemNoteFontSize.value + 'px',
      // 'font-family': this.ms.itemNoteFont.value,
      // 'text-shadow': this.ms.itemNoteShadow.value
    }
    return style
  }

  setIconStyle() {
    let style = {
      // 'width': this.screenWidth <= 750 ? +this.ms.iconSize.value / 2 + 'px' : this.ms.iconSize.value + 'px',
      // 'height': this.screenWidth <= 750 ? +this.ms.iconSize.value / 2 + 'px' : this.ms.iconSize.value + 'px',
    }
    return style
  }

  setAbvStyle() {
    let style = {
      // 'color': this.ms.itemAbvFontColor.value,
      // 'font-size': this.screenWidth <= 750 ? +this.ms.itemAbvFontSize.value / 2 + 'px' : this.ms.itemAbvFontSize.value + 'px',
      // 'font-family': this.ms.itemAbvFont.value,
      // 'text-shadow': this.ms.itemAbvShadow.value
    }
    return style
  }

  setElementStyle() {
    let style = {
      // 'border-collapse': 'separate !important',
      // 'background-color': this.ms.itemBackground.value,
      // 'border': this.ms.itemBorder.value,
      // 'border-radius': this.ms.itemBorderRadius.value + 'px',
      // 'box-shadow': this.ms.itemBoxShadow.value,
      // 'height': this.ms.itemBackgroundHeight.value+'px'
    }
    return style
  }

  setSoldOutStyle() {
    let style = {
      // 'color': this.ms.itemSoldOutFontColor.value,
      // 'font-size': this.screenWidth <= 750 ? +this.ms.itemSoldOutFontSize.value / 2 + 'px' : this.ms.itemSoldOutFontSize.value + 'px',
      // 'font-family': this.ms.itemSoldOutFont.value,
      // 'text-shadow': this.ms.itemSoldOutShadow.value
    }
    return style
  }

  setColumnStyle() {
    let style = {
      // 'grid-template-columns': this.screenWidth <= 750 ? +this.ms.iconSize.value / 2 + 'px auto' : this.ms.iconSize.value + 'px auto'
    }
    return style
  }
}
