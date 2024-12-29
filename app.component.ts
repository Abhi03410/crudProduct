import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  myProductTitleName: string = 'Product List';
  myProductForm!: FormGroup;
  myProductList: any[] = [];
  isEdit: boolean = false;
  selectedIndex!: number | null;
  chartData: any;
  chartOptions: any;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.initialForm();
    this.initializeChart();
  }
  initialForm() {
    this.myProductForm = this.fb.group({
      productName: this.fb.control('', Validators.required),
      productPrice: this.fb.control('', Validators.required),
      productCategory: this.fb.control('', Validators.required),
    })
  }
  onSubmit() {
    if (this.isEdit && this.selectedIndex !== null) {
      // update the specific product
      this.myProductList[this.selectedIndex] = this.myProductForm.value;
      this.isEdit = false;
      this.selectedIndex = null;
      this.updateChartData();
    } else {
      // Add Product 
      this.myProductList.push(this.myProductForm.value);
      this.updateChartData();
    }
    this.myProductForm.reset();
  }

  editProduct(pdt: any, pdtIndex: any) {
    this.myProductForm.patchValue(pdt);
    this.isEdit = true;
    this.selectedIndex = pdtIndex;
  }
  deleteProduct(productIndexNumber: any) {
    // console.log(productIndexNumber);
    this.myProductList.splice(productIndexNumber, 1);
    this.updateChartData();
  }


  initializeChart() {
    this.chartData = {
      labels: [],
      datasets: [
        {
          label: 'Prices',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: []
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    };
  }

  updateChartData() {
    this.chartData.labels = this.myProductList.map(item => item.productName);
    this.chartData.datasets[0].data = this.myProductList.map(item => parseFloat(item.productPrice));
  }

}
