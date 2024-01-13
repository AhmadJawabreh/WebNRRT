import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { pageSize } from 'src/app/shared/constent';
import { TeamMemberFilter } from './../../api-client-services/team-members/filters/team-member-filter';
import { TeamMemberResource } from './../../api-client-services/team-members/resources/team-member-resource';
import { TeamMembersService } from './../../services/team-members.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css'],
})
export class TeamMembersComponent implements OnInit, OnDestroy {
  public totalResult = 0;
  private selectedId = 0;
  public isLoading = true;
  public dataSource = [] as TeamMemberResource[];
  public subscriptions = new Subscription();
  public displayedColumns: string[] = ['Name', 'PhoneNumber', 'TeamName', 'Actions'];

  constructor(
    private readonly teamMemberService: TeamMembersService,
    private readonly router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  public ngOnInit(): void {
    this.teamMemberService.loadTeamMembers({
      skip: 0,
      take: pageSize,
    } as TeamMemberFilter);

    this.subscriptions.add(
      this.teamMemberService.isloading.subscribe(
        (isLoading: boolean) => (this.isLoading = isLoading)
      )
    );

    this.subscriptions.add(
      this.teamMemberService.teamMembers.subscribe(
        (items: TeamMemberResource[]) => {
          this.dataSource = items;
        }
      )
    );

    this.subscriptions.add(
      this.teamMemberService.totalResult.subscribe(
        (count) => (this.totalResult = count)
      )
    );
  }

  public openDailog(content: any, id: number) {
    this.selectedId = id;
    this.modalService.open(content);
  }

  public openCreationForm() {
    this.router.navigate([`team/members/create`]);
  }

  public openModificationForm(id: number) {
    this.router.navigate([`team/members/edit/${id}`]);
  }

  public deleteTeamMember() {
    this.modalService.dismissAll();
    this.teamMemberService.deleteTeamMember(this.selectedId);
  }

  public next(event: PageEvent) {
    this.teamMemberService.loadTeamMembers({
      skip: event.pageIndex * pageSize,
      take: pageSize,
    } as TeamMemberFilter);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
