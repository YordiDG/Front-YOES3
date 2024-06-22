import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Moment } from 'moment';
import * as moment from 'moment';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-add-futuro',
  templateUrl: './add-futuro.component.html',
  styleUrls: ['./add-futuro.component.css']
})
export class AddFuturoComponent implements OnInit {
  usuarioActual: any;
  totalCarrito: number = 0;
  form: FormGroup = new FormGroup({});
  @ViewChild('content') content!: ElementRef;

  displayedColumnsTable: string[] = ['Fecha', 'Interés', 'Amortización', 'Saldo Final', 'Flujo'];
  tablaDatos: any[] = [];
  tablaVisible: boolean = false;
  today = new Date();

  constructor(private fb: FormBuilder, private loginService: LoginService, private snackBar: MatSnackBar, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      precioVehicular: [''],
      tipoTasaInteres: [''],
      tna: [''],
      fechaInicio: [null],
      fechaFin: [''],
      metodoCalculo: ['']
    });
    this.today.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.usuarioActual = this.loginService.getCurrentUser();
    this.loginService.totalCarrito$.subscribe(total => {
      this.totalCarrito = total;
      this.form.controls['precioTotal'].setValue(total);
    });
  }

  myDateFilter = (d: Date | null): boolean => {
    const date = (d || new Date());
    // Prevent dates before today
    return date >= this.today;
  };

  calcularTabla() {
    const total = this.form.get('precioVehicular')?.value ?? 0;
    const tipoTasa = this.form.get('tipoTasaInteres')?.value ?? 'nominal';
    const tnaValue = this.form.get('tna')?.value;
    const tna = tnaValue !== undefined && tnaValue !== null ? parseFloat(tnaValue) : 0;
    const fechaInicioValue = this.form.get('fechaInicio')?.value;
    const fechaFinValue = this.form.get('fechaFin')?.value;
    const fechaInicio = fechaInicioValue ? moment(fechaInicioValue) : moment();
    const fechaFin = fechaFinValue ? moment(fechaFinValue) : moment();
    const metodo = this.form.get('metodoCalculo')?.value ?? 'frances';

    if (!fechaInicio.isValid() || !fechaFin.isValid()) {
      this.snackBar.open('Por favor, ingrese fechas válidas.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    let tasaDiaria: number = 0;
    if (tipoTasa === 'nominal') {
      tasaDiaria = tna / 360 / 100; // Tasa diaria en decimal para nominal
    } else if (tipoTasa === 'efectiva') {
      tasaDiaria = Math.pow(1 + tna / 100, 1 / 360) - 1; // Tasa diaria efectiva
    }

    if (isNaN(tasaDiaria) || tasaDiaria === Infinity || tasaDiaria === -Infinity) {
      this.snackBar.open('Por favor, ingrese una tasa válida.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const dias = fechaFin.diff(fechaInicio, 'days');
    this.tablaDatos = [];

    if (metodo === 'americano') {
      this.calculoAmericano(total, tasaDiaria, dias, fechaInicio);
    } else if (metodo === 'frances') {
      this.calculoFrances(total, tasaDiaria, dias, fechaInicio);
    } else if (metodo === 'aleman') {
      this.calculoAleman(total, tasaDiaria, dias, fechaInicio);
    }

    this.tablaVisible = true;
  }

  calculoAmericano(total: number, tasaDiaria: number, dias: number, fechaInicio: Moment) {
    let saldo = total;

    for (let i = 0; i <= dias; i++) {
      const fecha = fechaInicio.clone().add(i, 'days').format('DD/MM/YYYY');
      const interes = saldo * tasaDiaria;
      const amortizacion = (i === dias) ? saldo : 0;
      const saldoFinal = (i === dias) ? 0 : saldo;
      const flujo = 0; // Ajustado correctamente

      // Formatear números a cadena con 4 decimales
      const interesFormateado = this.formatNumber(interes);
      const amortizacionFormateada = this.formatNumber(amortizacion);
      const saldoFinalFormateado = this.formatNumber(saldoFinal);
      const flujoFormateado = this.formatNumber(flujo);

      this.tablaDatos.push({
        Fecha: fecha,
        Interés: interesFormateado,
        Amortización: amortizacionFormateada,
        'Saldo Final': saldoFinalFormateado,
        Flujo: flujoFormateado
      });

      saldo -= (i === dias) ? total : 0;
    }
  }


  formatNumber(value: number): string {
    if (typeof value === 'number' && !isNaN(value) && isFinite(value)) {
      return value.toFixed(4);
    } else {
      return '0.0000';
    }
  }


  calculoFrances(total: number, tasaDiaria: number, dias: number, fechaInicio: Moment) {
    const cuota = total * (tasaDiaria * Math.pow(1 + tasaDiaria, dias)) / (Math.pow(1 + tasaDiaria, dias) - 1);
    let saldo = total;

    for (let i = 0; i < dias; i++) {
      const fecha = fechaInicio.clone().add(i + 1, 'days').format('DD/MM/YYYY');
      const interes = saldo * tasaDiaria;
      const amortizacion = cuota - interes;
      saldo -= amortizacion;

      this.tablaDatos.push({ Fecha: fecha, Interés: interes.toFixed(4), Amortización: amortizacion.toFixed(4), 'Saldo Final': saldo.toFixed(4), Flujo: cuota.toFixed(4) });
    }
  }

  calculoAleman(total: number, tasaDiaria: number, dias: number, fechaInicio: Moment) {
    const capital = total / dias;
    let saldo = total;

    for (let i = 0; i < dias; i++) {
      const fecha = fechaInicio.clone().add(i + 1, 'days').format('DD/MM/YYYY');
      const interes = saldo * tasaDiaria;
      const flujo = capital + interes;
      saldo -= capital;

      this.tablaDatos.push({ Fecha: fecha, Interés: interes.toFixed(4), Amortización: capital.toFixed(4), 'Saldo Final': saldo.toFixed(4), Flujo: flujo.toFixed(4) });
    }
  }

  resetForm() {
    this.form.reset();
    this.tablaVisible = false;
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

  protected readonly parseFloat = parseFloat;
  protected readonly Math = Math;
}
