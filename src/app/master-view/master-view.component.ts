import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ISimpleComboSelectionChangingEventArgs } from '@infragistics/igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { DashboardNames } from '../models/reveal-webinar-demo/dashboard-names';
import { RevealWebinarDemoService } from '../services/reveal-webinar-demo.service';

declare let $: any;

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.scss']
})
export class MasterViewComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();
  public dashboardName?: string;
  public revealServerUrl: string = 'https://localhost:7218';
  public revealWebinarDemoDashboardNames: DashboardNames[] = [];
  @ViewChild('revealDashBoard')
  public revealDashBoard!: ElementRef;

  constructor(
    private revealWebinarDemoService: RevealWebinarDemoService,
  ) {}

  ngOnInit() {
    this.revealWebinarDemoService.getDashboardNamesList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.revealWebinarDemoDashboardNames = data,
      error: (_err: any) => this.revealWebinarDemoDashboardNames = []
    });
  }

  public ngAfterViewInit() {
    this.setRevealTheme();
    $.ig.RevealSdkSettings.ensureFontsLoaded()
      .then(() => {
        $.ig.RevealSdkSettings.setBaseUrl(this.revealServerUrl);

        $.ig.RVDashboard.loadDashboard("dashboardName!", (dashboard: any) => {
          const _revealDashBoard = new $.ig.RevealView(this.revealDashBoard.nativeElement);
          _revealDashBoard.dashboard = dashboard;
          _revealDashBoard.canCopyVisualization = false;
          _revealDashBoard.canDuplicateVisualization = false;
        });
      })
      .catch((err: any) => {
        console.warn('An error occurred during Reveal setup.', err);
      })
;  }

  private setRevealTheme() {
    const style = window.getComputedStyle(document.body);
    const theme = new $.ig.RevealTheme();
    theme.regularFont = style.getPropertyValue('--ig-font-family').replace(/\s/g, '+') ?? 'sans-serif';
    theme.mediumFont = theme.regularFont;
    theme.boldFont = theme.regularFont;

    theme.fontColor = style.getPropertyValue('--ig-surface-500-contrast');
    theme.isDark = theme.fontColor !== 'black';
    theme.dashboardBackgroundColor = `hsl(${style.getPropertyValue('--ig-gray-100')})`;
    theme.visualizationBackgroundColor = `hsl(${style.getPropertyValue('--ig-surface-500')})`;

    $.ig.RevealSdkSettings.theme = theme;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.dashboardName = event.newValue as string;
  }
}
