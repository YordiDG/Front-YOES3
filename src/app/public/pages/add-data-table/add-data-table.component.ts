import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


import { ChangeDetectorRef} from "@angular/core";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, NativeDateAdapter} from '@angular/material/core';
import {ActivatedRoute} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {Subscription} from "rxjs";
import {Users} from "../../models/Users";
import {OrderService} from "../../services/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderDetailService} from "../../services/order-detail.service";
import {MatCheckboxChange} from "@angular/material/checkbox";


export interface PeriodicElement {
  title: string;
  porct:boolean;
  value: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: 'TEA (%)', porct: false, value: '0'},
  {title: 'TEM (%)', porct: false, value: '0'},
  {title: 'Cuota Inicial', porct: true, value: '0'},
  {title: 'Cuota Final', porct: true, value: '0'},
  {title: 'Monto Del Préstamo', porct: true, value: '0'},
  {title: 'Importe Para Cuotas', porct: true, value: '0'},
  {title: 'Saldo Capitalizado', porct: true, value: '296.58'},
  {title: 'R (Cuotas Mensuales)', porct: true, value: '0'},
  {title: 'Valor Actual Saldo Final', porct: true, value: '0'},
  {title: 'Valor Cuota Extra', porct: true, value: '0'},

];

const ELEMENT_DATA_GASTOS_PERIODICOS: PeriodicElement[] = [
  {title: 'Seguro de Desgravamen (%)', porct: false, value: '0.04'},
];

const ELEMENT_DATA_TOTALES: PeriodicElement[] = [
  {title: 'Intereses', porct: true, value: '0'},
  {title: 'Amortización del capital', porct: true, value: '0'},
  {title: 'Portes', porct: true, value: '0'},
];

const ELEMENT_DATA_INDICADORES_RENTABILIDAD: PeriodicElement[] = [
  {title: 'Tasa de descuento', porct: false, value: '0'},
  {title: 'TIR de la operacion', porct: false, value: '0'},
  {title: 'TCEA de la operacion', porct: false, value: '0'},
  {title: 'VAN operacion', porct: true, value: '0'},
];


@Component({
  selector: 'app-add-data-table',
  templateUrl: './add-data-table.component.html',
  styleUrls: ['./add-data-table.component.css'],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'LL',
        },
        display: {
          dateInput: 'LL',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }}
  ],
})
export class AddDataTableComponent implements OnInit{

  @ViewChild('content') content!: ElementRef;

  usuarioActual: any;
  totalCarrito: number = 0;
  form: FormGroup = new FormGroup({ });
  form2: FormGroup = new FormGroup({ });
  paymentPlanForm=FormGroup;
  interesMoratorioEnabled: boolean = false;


  constructor(private fb: FormBuilder, private orderDetailService: OrderDetailService,private snackBar: MatSnackBar, private orderService: OrderService,private loginService: LoginService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
    this.form = this.fb.group({
      precioTotal: [''],
    });

  }

  ngOnInit() {
    this.usuarioActual = this.loginService.getCurrentUser();
    this.loginService.totalCarrito$.subscribe(total => {
      this.totalCarrito = total;
      this.form.controls['totalCarrito'].setValue(total);
      this.form.controls['totalCarrito'].setValue(total);
    });


    this.form = this.fb.group({
      ingresoMensual: [1000, Validators.required],//input
      precioVehicular: [500, Validators.required],//input
      cuotaInicial: [10, Validators.required],
      cuotaFinal: [10, Validators.required],
      tipoTasaInteres: ['nominal', Validators.required],
      tna: [12, Validators.required],//input
      seguroDegravamen: [0.05, Validators.required],
      seguroVehicularAnual: [1, Validators.required],
      plazo: ['1', Validators.required],//input
      plazoGraciaTotal: [1, Validators.required],//input
      interesMoratorio: ['5.45'],
      incluirInteresMoratorio: [this.interesMoratorioEnabled],
      plazoGraciaParcial: [1, Validators.required],//input
      tasaDescuentoCOK: [13, Validators.required],//input
      periodoCapitalizacion: ['Mensual', Validators.required],
      frecuenciaPago: ['30', Validators.required],
      nDiasAnio: new FormControl({ value: 360, disabled :true}),
      costesNotariales: [ 0, Validators.required],
      tipoPagoCostesNotariales: ['prestamo', Validators.required],
      costesRegistrales: [1, Validators.required],
      tipoPagoCostesRegistrales: ['prestamo', Validators.required],
      tasacion: [1 , Validators.required],
      tipoPagoTasacion: ['prestamo', Validators.required],
      comisionEstudio: [1 , Validators.required],
      tipoPagoComisionEstudio: ['prestamo', Validators.required],
      comisionActivacion: [1 , Validators.required],
      tipoPagoComisionActivacion: ['prestamo', Validators.required],
    });

    this.form2 = this.fb.group({
      gps: [1, Validators.required],
      portes: [3.5, Validators.required],
      gastosAdministrativos: [1.5, Validators.required],
    });


    this.dataSource[0].value = this.calculateTEA().toString();
    this.dataSource[1].value = this.calculateTEM().toString();
    this.dataSource[2].value = this.calculateCuotaInicial().toString();
    this.dataSource[3].value = this.calculateCuotaFinal().toString();
    this.dataSource[4].value = this.calculateMontoPrestamo().toString();
    this.dataSource[5].value = this.calcuateImporteParaCuotas().toString();
    //this.dataSource[6].value = this.calculateSaldoCapitalizado().toString();
    this.dataSource[7].value = this.calculateRCuotasMensuales().toString();

    this.dataSourceIndicadoresRentabilidad[0].value = this.calculateTasaDescuento().toString();

    this.form.valueChanges.subscribe(()=>{
      this.dataSource[0].value = this.calculateTEA().toString();
      this.dataSource[1].value = this.calculateTEM().toString();
      // this.dataSource[2].value = this.calculateSeguroVehicularAnual().toString();
      this.dataSource[2].value = this.calculateCuotaInicial().toString();
      this.dataSource[3].value = this.calculateCuotaFinal().toString();
      this.dataSource[4].value = this.calculateMontoPrestamo().toString();
      this.dataSource[5].value = this.calcuateImporteParaCuotas().toString();
      this.dataSource[7].value = this.calculateRCuotasMensuales().toString();



      this.dataSourceIndicadoresRentabilidad[0].value = this.calculateTasaDescuento().toString();
    })

    this.form2.valueChanges.subscribe(()=>{
    })

    this.route.params.subscribe( params => {
      const priceCar = +params['precio']
      this.form.get('precioVehicular')?.setValue(priceCar);
    })
  }


  displayedColumns: string[] = ['title', 'value'];
  dataSource = ELEMENT_DATA;
  dataSourceTotales = ELEMENT_DATA_TOTALES;
  dataSourceIndicadoresRentabilidad = ELEMENT_DATA_INDICADORES_RENTABILIDAD;
  dataSourceGastosPeriodicos = ELEMENT_DATA_GASTOS_PERIODICOS;
  tableData : any [] = [];
  displayedColumnsTable: string[] = [
    'N°',
    'TEA',
    'i\' = TEP = TEM',
    'Fecha',
    'P.G',
    'Saldo Inicial Cuota Final',
    'Interes Cuota Final',
    'Amortización Cuota Final',
    'Saldo Final Cuota Final',
    'Saldo Inicial Para Cuota',
    'Intereses',
    'Cuota',
    'Amortización',
    'Saldo Final Para Cuota',
    'Flujo',
  ];

  onCheckboxChange(event: MatCheckboxChange) {
    this.interesMoratorioEnabled = event.checked;

    if (!this.interesMoratorioEnabled) {
      this.form.patchValue({
        interesMoratorio: '5.25'
      });
    }
  }




  resetForm(): void {
    this.form.reset();
  }

  guardarComoPDF() {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const content = this.content.nativeElement;

    html2canvas(content).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Ancho de la página PDF
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save("cuotas-yoes.pdf");
    });
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }



  CalcularTabla() {

    const van = this.calculateVAN();



    const order = {
      fecha: this.formatDate(new Date()),
      montoPrestamo: this.dataSource[4].value,
      tasaDescuento: this.dataSourceIndicadoresRentabilidad[0].value,
      van: van,
      tableData: this.tableData
    };

    this.orderService.saveOrder(order).subscribe(
      (orderResponse: any) => {
        const orderId = orderResponse.id;

        const orderDetails = this.tableData.map((row, index) => ({
          orderId: orderId,
          numero: index + 1,
          tea: row['TEA'],
          tep: row['i\' = TEP = TEM'],
          pg: row['P.G'],
          saldoInicialCuotaFinal: row['Saldo Inicial Cuota Final'],
          interesCuotaFinal: row['Interes Cuota Final'],
          amortizacionCuotaFinal: row['Amortizacion Cuota Final'],
          saldoFinalCuotaFinal: row['Saldo Final Cuota Final'],
          saldoInicialParaCuota: row['Saldo Inicial Para Cuota'],
          intereses: row['Intereses'],
          cuota: row['Cuota'],
          seguroDegravamen: row['Seguro Degravamen'],
          portes: row['Portes'],
          gastosAdministrativos: row['Gastos Administrativos'],
          saldoFinalParaCuota: row['Saldo Final Para Cuota'],
          flujo: row['Flujo'],
          interesMoratorio: row['Interes Moratorio'],
        }));

        console.log('Order Details:', JSON.stringify(orderDetails, null, 2));

        this.orderDetailService.saveOrderDetail(orderDetails).subscribe(
          response => {
            this.snackBar.open('Detalles de la orden guardados con éxito', 'Cerrar', {
              duration: 3000,
            });
          },
          error => {
            console.error('Error al guardar los detalles de la orden', error);
            this.snackBar.open('Error al guardar los detalles de la orden', 'Cerrar', {
              duration: 3000,
            });
          }
        );
      },
      error => {
        console.error('Error al guardar la orden principal', error);
        this.snackBar.open('Error al guardar la orden principal', 'Cerrar', {
          duration: 3000,
        });
      }
    );


    /***********/

    const plan_meses = parseInt( this.form.get('plazo')?.value);
    let rows = plan_meses + 2;
    let cols = 21

    let plazoGraciaTotalValueAux = parseInt(this.form.get('plazoGraciaTotal')?.value)
    let saldoCapitalizadoAux : any = parseFloat(this.dataSource[5].value);


    this.tableData = []
    this.tableData.push({
      'N°': -1,
      'TEA': -1,
      'i\' = TEP = TEM': -1,
      'P.G': -1,
      'Saldo Inicial Cuota Final': -1,
      'Interes Cuota Final': -1,
      'Amortización Cuota Final': -1,
      'Seguro Degravamen Cuota Final': -1,
      'Saldo Final Cuota Final': -1,
      'Saldo Inicial Para Cuota': -1,
      'Intereses': -1,
      'Cuota': -1,
      'Amortización': -1,
      'Seguro Degravamen': -1,
      'GPS': -1,
      'Portes': -1,
      'Gastos Administrativos': -1,
      'Seguro Vehicular': -1,
      'Saldo Final Para Cuota': -1,
      'Flujo': this.calculateMontoPrestamo(),
      'Interes Moratorio': -1,
    });

    for (let i = 1; i < rows; i++) {
      const rowObject: { [key: string]: any | number } = {}

      for (let j = 0; j < cols; j++) {

        if(j == 0){
          // if(!this.first_time){
          //   this.tableData[i]['N°'] = i
          // } else
          rowObject['N°'] = i
        }

        else if(j == 1) {
          const teaValue = this.calculateTEA();
          if (teaValue !== null && teaValue !== undefined) {
            // if(!this.first_time){
            //   this.tableData[i]['TEA'] = (Number(teaValue).toFixed(2));
            // } else
            rowObject['TEA'] = (Number(teaValue).toFixed(2));
          }
        }

        else if(j == 2) {
          const temValue = this.calculateTEM();
          if (temValue !== null && temValue !== undefined) {
            // if(!this.first_time){
            //   this.tableData[i]['i\' = TEP = TEM'] = (Number(temValue).toFixed(2));
            // } else
            rowObject['i\' = TEP = TEM']= (Number(temValue).toFixed(2));
          }
        }

        if (j === 3) {
          const fechaActual = new Date();
          let fechaIterada = new Date(fechaActual);

          fechaIterada.setDate(fechaActual.getDate() + 30 * (i - 1));

          // Obtener el nombre del mes y año en formato texto
          const nombreMes = fechaIterada.toLocaleString('es-ES', { month: 'long' });
          const año = fechaIterada.getFullYear();

          // Construir la fecha en el formato deseado (por ejemplo, "24 de junio de 2024")
          rowObject['Fecha'] = `${fechaIterada.getDate()} de ${nombreMes} de ${año}`;
        }




        else if(j == 4) {
          const plazoGraciaTotalValue = parseInt(this.form.get('plazoGraciaTotal')?.value)
          const plazoGraciaParcialValue = parseInt(this.form.get('plazoGraciaParcial')?.value)

          if(plazoGraciaParcialValue + plazoGraciaTotalValue === 0)
          {
            rowObject['P.G']  = ('S')
          }
          else if(i <= plazoGraciaTotalValue)
          {
            rowObject['P.G'] = ('T')
          }
          else if (i > plazoGraciaParcialValue + plazoGraciaTotalValue){
            rowObject['P.G'] = ('S')
          }
          else{
            rowObject['P.G'] = ('P')
          }
        }

        else if(j == 5) {
          const plan = parseInt(this.form.get('plazo')?.value);
          const cuotaFinal = parseFloat(this.dataSource[3].value);
          const tem = parseFloat(this.dataSource[1].value)/100;

          if(i ==1){
            rowObject['Saldo Inicial Cuota Final'] = (((cuotaFinal)/(1 + tem)**(plan+1))).toFixed(5)
          }else{
            rowObject['Saldo Inicial Cuota Final']= (this.tableData[i-1]['Saldo Final Cuota Final']).toFixed(5)
          }
        }

        else if(j == 6) {
          const saldoInicialCuotaFinal = rowObject['Saldo Inicial Cuota Final'] * -1;
          const tem = parseFloat(this.dataSource[1].value)/100;
          rowObject['Interes Cuota Final'] = ((saldoInicialCuotaFinal * tem)).toFixed(5)
        }
        //
        else if(j == 7) {
          const plan = parseInt(this.form.get('plazo')?.value);
          const saldoInicialCuotaFinal = parseFloat(rowObject['Saldo Inicial Cuota Final'])  * -1;
          const interesCuotaFinal = parseFloat(rowObject['Interes Cuota Final']);

          if(i == plan+1){
            rowObject['Amortización Cuota Final'] = (saldoInicialCuotaFinal + interesCuotaFinal).toFixed(5)
          }
          else{
            rowObject['Amortización Cuota Final'] = (0)
          }
        }

        else if(j == 8) {
          const seguroDegravamen = parseFloat(this.form.get('seguroDegravamen')?.value)/100;
          const saldoInicialCuotaFinal = rowObject['Saldo Inicial Cuota Final'];
          rowObject['Seguro Degravamen Cuota Final'] = (((saldoInicialCuotaFinal * seguroDegravamen)* -1)).toFixed(5)
        }


        else if(j == 9) {
          const res = (parseFloat(rowObject['Saldo Inicial Cuota Final']) - parseFloat(rowObject['Interes Cuota Final']) + parseFloat(rowObject['Amortización Cuota Final']))
          rowObject['Saldo Final Cuota Final'] = (res)
        }

        //bad code
        else if(j == 10 ) {
          const plazo = parseInt(this.form.get('plazo')?.value);
          if(i == 1){
            rowObject['Saldo Inicial Para Cuota'] =  (parseFloat(this.dataSource[5].value)).toFixed(5)
          }
          else{
            if(i <= plazo){

              rowObject['Saldo Inicial Para Cuota'] =  (this.tableData[i-1]['Saldo Final Para Cuota'])
            }
            else{

              rowObject['Saldo Inicial Para Cuota'] = (0)
            }
          }
        }

        else if(j == 11 ) {
          rowObject['Intereses'] =((parseFloat(rowObject['Saldo Inicial Para Cuota'])* -1  * (parseFloat(this.dataSource[1].value)/100)).toFixed(7))
        }

        else if(j == 12 ) {
          const plazo = parseInt(this.form.get('plazo')?.value);

          if(i <= plazo){
            if(rowObject['P.G'] == 'T'){
              rowObject['Cuota'] =(0)
            }
            else{
              if(rowObject['P.G'] == 'P'){
                rowObject['Cuota'] =((parseFloat(rowObject['Intereses'])))
              }
              else {

                rowObject['Cuota'] =  parseFloat(this.dataSource[7].value) * -1;



              }
            }
          }else {  rowObject['Cuota'] =(0) }
        }

        else if(j == 13 ) {
          const gastosAdministrativos = parseFloat(this.form2.get('gastosAdministrativos')?.value) * -1;
          rowObject['Gastos Administrativos'] = gastosAdministrativos

        }

        else if(j == 14) {
          const seguroDegravamen = parseFloat(this.form.get('seguroDegravamen')?.value)/100;

          rowObject['Seguro Degravamen'] =((parseFloat(rowObject['Saldo Inicial Para Cuota'])) *-1 * seguroDegravamen)
        }

        else if(j == 15) {
          const precioVehicular = parseFloat(this.form.get('precioVehicular')?.value) * -1;
          const seguroVehicularMensual =  parseFloat(this.dataSourceGastosPeriodicos[0].value)/100;

          rowObject['Seguro Vehicular'] =  ((precioVehicular * seguroVehicularMensual))
        }

        else if(j == 16) {
          const gps = parseFloat(this.form2.get('gps')?.value) * -1;

        }

        else if(j == 17) {
          const portes = parseFloat(this.form2.get('portes')?.value) * -1;

          rowObject['Portes'] = portes
        }

        else if(j == 18) {

          const plazo = parseInt(this.form.get('plazo')?.value);
          if(i <= plazo){
            if(rowObject['P.G'] == 'T' || rowObject['P.G'] == 'P'){
              rowObject['Amortización'] =(0)
            }
            else{
              const cuota = parseFloat(rowObject['Cuota']).toFixed(2);
              const intereses = parseFloat(rowObject['Intereses']).toFixed(2);
              const seguroDegravamen = parseFloat(rowObject['Seguro Degravamen']).toFixed(2);
              const seguroDegravamenCuotaFinal = parseFloat(rowObject['Seguro Degravamen Cuota Final']).toFixed(2);
              const portes = parseFloat(rowObject['Portes']).toFixed(2);
              const gastosAdministrativos = parseFloat(rowObject['Gastos Administrativos']).toFixed(2);

              rowObject['Amortización'] =   parseFloat(cuota) - parseFloat(intereses) - parseFloat(seguroDegravamen) - parseFloat(seguroDegravamenCuotaFinal)  - parseFloat(portes) - parseFloat(gastosAdministrativos)
            }
          }
          else{
            rowObject['Amortización'] = 0;
          }
        }


        //bad code
        else if (j == 19){

          // if(this.tableData[i]['P.G'] == 'T'){
          //   if(!this.first_time){
          //     this.tableData[i]['Saldo Final Para Cuota'] = (parseFloat(this.tableData[i]['Saldo Inicial Para Cuota']) - parseFloat(this.tableData[i]['Intereses'])).toFixed(5)
          //   } else  {
          //     rowObject['Saldo Final Para Cuota'] = (parseFloat(rowObject['Saldo Inicial Para Cuota']) - parseFloat(rowObject['Intereses'])).toFixed(5)
          //   }
          // }
          // else{
          //   if(!this.first_time){
          //     this.tableData[i]['Saldo Final Para Cuota'] = (parseFloat(this.tableData[i]['Saldo Inicial Para Cuota']) + parseFloat(this.tableData[i]['Amortización'])).toFixed(5)
          //   } else{
          //     rowObject['Saldo Final Para Cuota'] = (parseFloat(rowObject['Saldo Inicial Para Cuota']) + parseFloat(rowObject['Amortización'])).toFixed(5)
          //   }
          // }


          if(rowObject['P.G'] == 'T'){
            rowObject['Saldo Final Para Cuota'] = (parseFloat(rowObject['Saldo Inicial Para Cuota']) - parseFloat(rowObject['Intereses']))
          }
          else{
            const saldoInicialParaCuota = (parseFloat(rowObject['Saldo Inicial Para Cuota'])).toFixed(2);
            const amortizacion = (parseFloat(rowObject['Amortización'])).toFixed(2);
            rowObject['Saldo Final Para Cuota'] = (parseFloat(saldoInicialParaCuota) + parseFloat(amortizacion))
          }



        }

        else if(j == 20) {
          const cuota = parseFloat(rowObject['Cuota']).toFixed(2);
          const amortizacionCuotaFinal = parseFloat(rowObject['Amortización Cuota Final']).toFixed(2);

          if(rowObject['P.G'] == 'T' || rowObject['P.G'] == 'P'){
            const seguroDegravamen = parseFloat(rowObject['Seguro Degravamen']).toFixed(2)
            const seguroDeGravamenCuotaFinal = parseFloat(rowObject['Seguro Degravamen Cuota Final']).toFixed(2)
            const seguroVehicular = parseFloat(rowObject['Seguro Vehicular']).toFixed(2)
            rowObject['Flujo'] = parseFloat(cuota) + parseFloat(amortizacionCuotaFinal) + parseFloat(seguroDegravamen) + parseFloat(seguroDeGravamenCuotaFinal) + parseFloat(seguroVehicular)
          }
          else{
            rowObject['Flujo'] = parseFloat(cuota) + parseFloat(amortizacionCuotaFinal)
          }
        }

        else if (j == 21) {
          if (this.interesMoratorioEnabled) {
            this.calcularInteresMoratorio();
          } else {
            rowObject['Interes Moratorio'] = '0';
          }
        }

      }

      this.tableData.push(rowObject);

      if(plazoGraciaTotalValueAux == 0){
        this.dataSource[6].value = (saldoCapitalizadoAux).toFixed(3)
        this.dataSource[7].value = this.calculateRCuotasMensuales().toString()
      } else {
        saldoCapitalizadoAux = parseFloat(this.tableData[i]['Saldo Final Para Cuota'])
      }

      if(this.tableData[i]['P.G'] == 'T'){
        plazoGraciaTotalValueAux--;
      }
    }

    this.dataSource[8].value = this.calculateValorActualSaldoFinal().toString()
    this.dataSource[9].value = this.calculateValorCuotaExtra().toString()

    this.dataSourceTotales[0].value = this.calculateIntereses().toString()
    this.dataSourceTotales[1].value = this.calculateAmortizaciondelCapital().toString()
    this.dataSourceTotales[2].value = this.calculateSeguroDeGravamen().toString()
    this.dataSourceTotales[4].value = this.calculateGPS().toString()
    this.dataSourceTotales[5].value = this.calculatePortes().toString()
    this.dataSourceTotales[6].value = this.calculateGastosAdministrativos().toString()


    this.dataSourceIndicadoresRentabilidad[3].value = this.calculateVAN().toString()

    console.log(this.tableData)

  }

  calculateTEA() {
    if(this.form.get('tna')?.value == null ||
      this.form.get('tna')?.value == '') { return 0 }
    let tna = parseFloat(this.form.get('tna')?.value);
    if(this.form.get('tipoTasaInteres')?.value == "nominal") {
      tna = tna/100;
      tna = (((1+(tna/360))**360)-1)*100
    }
    return tna.toFixed(7)
  }

  calculateTEM(){
    if(this.dataSource[0].value == null ||
      this.dataSource[0].value == '') { return 0 }
    return (((1+(parseFloat(this.dataSource[0].value)/100) )**(30/360)-1)*100).toFixed(7)
  }


  calculateCuotaInicial(){
    if(this.form.get('precioVehicular')?.value == null ||
      this.form.get('precioVehicular')?.value == '' ||
      this.form.get('cuotaInicial')?.value == null ||
      this.form.get('cuotaInicial')?.value == '' ) { return 0 }

    let precioVehicular = parseFloat(this.form.get('precioVehicular')?.value);
    let cuotaInicial = parseFloat(this.form.get('cuotaInicial')?.value);
    return (precioVehicular * (cuotaInicial/100)).toFixed(3)
  }

  calculateCuotaFinal(){
    if(this.form.get('precioVehicular')?.value == null ||
      this.form.get('precioVehicular')?.value == '' ||
      this.form.get('cuotaFinal')?.value == null ||
      this.form.get('cuotaFinal')?.value == '' ) { return 0 }
    let precioVehicular = parseFloat(this.form.get('precioVehicular')?.value);
    let cuotaFinal = parseFloat(this.form.get('cuotaFinal')?.value);
    return (precioVehicular * (cuotaFinal/100)).toFixed(3)
  }

  calculateMontoPrestamo(){
    if(this.form.get('precioVehicular')?.value == null ||
      this.form.get('precioVehicular')?.value == '' ||
      this.dataSource[3].value == null ||
      this.dataSource[3].value == '' ) { return 0 }
    let precioVehicular = parseFloat(this.form.get('precioVehicular')?.value);
    let cuotaInicial = parseFloat(this.dataSource[2].value);
    let res = precioVehicular - cuotaInicial;
    if(this.form.get('costesNotariales')?.value != null && this.form.get('costesNotariales')?.value != '' && this.form.get('tipoPagoCostesNotariales')?.value == 'prestamo'){
      res = res + parseFloat(this.form.get('costesNotariales')?.value)
    }
    if(this.form.get('costesRegistrales')?.value != null && this.form.get('costesRegistrales')?.value != '' && this.form.get('tipoPagoCostesRegistrales')?.value == 'prestamo'){
      res = res + parseFloat(this.form.get('costesRegistrales')?.value)
    }
    if(this.form.get('tasacion')?.value != null && this.form.get('tasacion')?.value != '' && this.form.get('tipoPagoTasacion')?.value == 'prestamo'){
      res = res + parseFloat(this.form.get('tasacion')?.value)
    }
    if(this.form.get('comisionEstudio')?.value != null && this.form.get('comisionEstudio')?.value != '' && this.form.get('tipoPagoComisionEstudio')?.value == 'prestamo'){
      res = res + parseFloat(this.form.get('comisionEstudio')?.value)
    }
    if(this.form.get('comisionActivacion')?.value != null && this.form.get('comisionActivacion')?.value != '' && this.form.get('tipoPagoComisionActivacion')?.value == 'prestamo'){
      res = res + parseFloat(this.form.get('comisionActivacion')?.value)
    }
    return (res).toFixed(3)
  }

  calculateTasaDescuento(){
    if(this.form.get('tasaDescuentoCOK')?.value == null ||
      this.form.get('tasaDescuentoCOK')?.value == '') { return 0 }
    let tasaDescuentoCOK = parseFloat(this.form.get('tasaDescuentoCOK')?.value)/100;
    return (((1+tasaDescuentoCOK)**(30/360)-1)*100).toFixed(5)
  }

  calcuateImporteParaCuotas(){
    const montoPrestamo = parseFloat(this.dataSource[4].value);
    const cuotaFinal = parseFloat(this.dataSource[3].value);
    const tem = parseFloat(this.dataSource[1].value)/100;
    const plazo = parseFloat(this.form.get('plazo')?.value);

    return (montoPrestamo - (cuotaFinal/((1+tem)**(plazo + 1)))).toFixed(3)
  }

  calculateRCuotasMensuales(){
    const saldoCapitalizado = parseFloat(this.dataSource[6].value);
    const tem = parseFloat(this.dataSource[1].value)/100;
    const plazo = parseFloat(this.form.get('plazo')?.value);
    return (saldoCapitalizado*(tem*((1+tem)**plazo))/(((1+tem)**plazo)-1)).toFixed(3)
  }

  calculateValorActualSaldoFinal(){
    const SaldoFinalParaCuota = parseFloat(this.tableData[this.tableData.length-2]['Saldo Final Para Cuota']);
    const tem = parseFloat(this.dataSource[1].value)/100;

    let count = 0;
    for (let i = 0; i < this.tableData.length; i++) {
      if(this.tableData[i]['P.G'] == 'S'){
        count++;
      }
    }
    return (SaldoFinalParaCuota/((1+tem)**(count-1))).toFixed(3)
  }

  calculateIntereses(){
    let suma_cuota = 0, suma_seguro_degravamen = 0, suma_amortzacion = 0;

    for (let i = 1; i < this.tableData.length; i++) {
      suma_cuota += parseFloat(this.tableData[i]['Cuota']);
      suma_seguro_degravamen += parseFloat(this.tableData[i]['Seguro Degravamen']);
      suma_amortzacion += parseFloat(this.tableData[i]['Amortización']);
    }

    return ((suma_cuota - suma_seguro_degravamen - suma_amortzacion)*-1).toFixed(3)
  }

  calculateAmortizaciondelCapital(){
    let suma_amortizacion = 0, suma_amortizacion_cuota_final = 0;

    for (let i = 1; i < this.tableData.length; i++) {
      suma_amortizacion += parseFloat(this.tableData[i]['Amortización']);
      suma_amortizacion_cuota_final += parseFloat(this.tableData[i]['Amortización Cuota Final']);
    }

    return (suma_amortizacion*-1 - suma_amortizacion_cuota_final).toFixed(3)
  }

  calculateSeguroDeGravamen(){
    let suma_seguro_degravamen = 0;
    for (let i = 1; i < this.tableData.length; i++) {
      suma_seguro_degravamen += parseFloat(this.tableData[i]['Seguro Degravamen']);
    }
    return (suma_seguro_degravamen*-1).toFixed(3)
  }


  calculateGPS(){
    let suma_gps = 0;
    for (let i = 1; i < this.tableData.length; i++) {
      suma_gps += parseFloat(this.tableData[i]['GPS']);
    }
    return (suma_gps*-1).toFixed(3)
  }

  calculatePortes(){
    let suma_portes = 0;
    for (let i = 1; i < this.tableData.length; i++) {
      suma_portes += parseFloat(this.tableData[i]['Portes']);
    }
    return (suma_portes*-1).toFixed(3)
  }

  calculateGastosAdministrativos(){
    let suma_gastos_administrativos = 0;
    for (let i = 1; i < this.tableData.length; i++) {
      suma_gastos_administrativos += parseFloat(this.tableData[i]['Gastos Administrativos']);
    }
    return (suma_gastos_administrativos*-1).toFixed(3)
  }

  calculateVAN() {
    const montoPrestamo = parseFloat(this.dataSource[4].value);
    const tasaDescuento = parseFloat(this.dataSourceIndicadoresRentabilidad[0].value) / 100;
    let suma = 0;

    for (let i = 0; i < this.tableData.length; i++) {
      suma += parseFloat(this.tableData[i]['Flujo']) / ((1 + tasaDescuento) ** (i + 1));
    }

    const VAN = suma - montoPrestamo;
    return VAN.toFixed(3);
  }

  calculateValorCuotaExtra(){
    const valorActualSaldoFinal = parseFloat(this.dataSource[8].value);
    const tem = parseFloat(this.dataSource[1].value)/100;
    const plazo = parseFloat(this.form.get('plazo')?.value);
    const plazoGraciaTotal = parseFloat(this.form.get('plazoGraciaTotal')?.value);
    const plazoGraciaParcial = parseFloat(this.form.get('plazoGraciaParcial')?.value);

    return (valorActualSaldoFinal * (tem*((1+tem)**(plazo - plazoGraciaTotal - plazoGraciaParcial)))/(((1+tem)**(plazo - plazoGraciaTotal-plazoGraciaParcial  ))-1)).toFixed(3)
  }

  calcularInteresMoratorio() {
    const saldoCapitalizado = parseFloat(this.dataSource[5].value);
    const tasaInteresMoratorio = parseFloat(this.form.get('interesMoratorio')?.value);
    const diasAtraso = parseFloat(this.form.get('nDiasAnio')?.value);

    const interesMoratorio = (saldoCapitalizado * (tasaInteresMoratorio / 100) * (diasAtraso / 360)).toFixed(2);
  console.log("No puedo jalar la dataaaaaaaaaaaaaaaaaa")
    return interesMoratorio;
  }




  protected readonly Math = Math;
  protected readonly parseFloat = parseFloat;
}
