import { Component, OnInit, Input} from '@angular/core';
import { StockService } from '../stock.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from "rxjs";

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Warning</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>{{name}}!</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
  </div>
`
})

export class NgbdModalContent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit {
  onUpdateChartSubject: Subject<boolean> = new Subject<boolean>();
  service: StockService;
  public stocks = [];
  public companies: Array<string>;
  public from: string = "2002";
  public to: string = "2009";
  public company: string = 'NA';
  public yearFilter: Array<string> = ["2002", "2007", "2009"];
  public chartData: any = {
    dataLabels: this.yearFilter,
    dataValues: [0, 0, 0],
    companyLable: "NA",
  }

  constructor(service: StockService, private modalService: NgbModal) {
    this.service = service
  }

  open(message) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = message;
  }

  onUpdateChart() {
    this.onUpdateChartSubject.next(this.chartData);
  }

  ngOnInit() {
    this.fetchData()
  }

  onSelect($event) {
    var selectedOption = $event;
    if (selectedOption.name == "company") {
      this.company = selectedOption.data;
    } else if (selectedOption.name == "Start Year" && selectedOption.data > this.to) {
      this.open('Start year should be less than end year')
    } else if (selectedOption.name == "End Year" && selectedOption.data < this.from) {
      this.open('End year should be greater than start year');
    } else if (selectedOption.name == "Start Year" && selectedOption.data <= this.to) {
      this.from = selectedOption.data;
    } else if (selectedOption.name == "End Year" && selectedOption.data >= this.from) {
      this.to = selectedOption.data;
    }
    this.stocks.forEach((stock) => {
      if (this.company && (this.company == stock.company)) {
        var companyLable = this.company;
        var dataValues = [];
        var tempArr = JSON.parse(JSON.stringify(this.yearFilter));
        var dataLabels = tempArr.splice(
          tempArr.indexOf(this.from),
          tempArr.indexOf(this.to) + 1
        );
        (dataLabels || []).forEach((label) => {
          dataValues.push(stock["price_" + label]);
        });
        this.chartData['companyLable'] = companyLable;
        this.chartData['dataValues'] = dataValues;
        this.chartData['dataLabels'] = dataLabels;
        this.onUpdateChart()
      }
    })
  }

  fetchData() {
    try {
      this.service.getConfig()
        .subscribe((stocksList: any) => {
          stocksList = JSON.parse(stocksList || "[]");
          if (Array.isArray(stocksList) && stocksList.length) {
            this.stocks = stocksList;
            this.companies = stocksList.map((obj) => {
              return obj.company;
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}

