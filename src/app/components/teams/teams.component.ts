import { Router } from '@angular/router';
import { TeamsService } from './../../services/teams.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TeamResource } from 'src/app/api-client-services/teams/Resources/team-resource';
import { pageSize } from 'src/app/shared/constent';
import { TeamFilter } from 'src/app/api-client-services/teams/filters/team-filter';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})

export class TeamsComponent implements OnInit, OnDestroy {
  public totalResult = 0;
  private selectedId = 0;
  public isLoading = true;
  public dataSource = [] as TeamResource[];
  public subscriptions = new Subscription();
  public displayedColumns: string[] = ['Name','Actions'];

  constructor(
    private readonly teamsService: TeamsService,
    private readonly router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  public ngOnInit(): void {
    this.teamsService.loadTeams({
      skip: 0,
      take: pageSize,
    } as TeamFilter);

    this.subscriptions.add(
      this.teamsService.isloading.subscribe(
        (isLoading: boolean) => (this.isLoading = isLoading)
      )
    );

    this.subscriptions.add(
      this.teamsService.teams.subscribe((items: TeamResource[]) => {
        this.dataSource = items;
      })
    );

    this.subscriptions.add(
      this.teamsService.totalResult.subscribe(
        (count) => (this.totalResult = count)
      )
    );
  }

  public openDailog(content: any, id: number) {
    this.selectedId = id;
    this.modalService.open(content);
  }

  public openCreationForm() {
    this.router.navigate([`teams/create`]);
  }

  public openModificationForm(id: number) {
    this.router.navigate([`teams/edit/${id}`]);
  }

  public deleteTeam() {
    this.modalService.dismissAll();
    this.teamsService.deleteTeam(this.selectedId);
  }

  public next(event: PageEvent) {
    this.teamsService.loadTeams({
      skip: event.pageIndex * pageSize,
      take: pageSize,
    } as TeamFilter);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
