import { Component, OnChanges, SimpleChanges, OnInit  } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnChanges, OnInit  {

  @Input() datalist;
  @Input() name;
  @Input() selectedOption;
  @Output() selectOption = new EventEmitter<any>();
 
  selectValue(data) {
    this.selectOption.emit(data);
  }

  ngOnInit() {
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedOption) {
      this.selectedOption = changes.selectedOption.currentValue;
    }
    if (changes.name) {
      this.name = changes.name.currentValue;
    }
    if (changes.datalist) {
      this.datalist = changes.datalist.currentValue;
    }
    if(changes.name && changes.name.currentValue && changes.name.currentValue === 'company') {
      this.selectedOption = "Select Company";
    }
  }

}
