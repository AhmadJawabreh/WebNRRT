import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { TeamMemberFilter } from 'src/app/api-client-services/team-members/filters/team-member-filter';
import { TeamResource } from 'src/app/api-client-services/teams/Resources/team-resource';
import { TeamFilter } from 'src/app/api-client-services/teams/filters/team-filter';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamMemberModel } from './../../api-client-services/team-members/models/team-member-model';
import { TeamMemberResource } from './../../api-client-services/team-members/resources/team-member-resource';
import { TeamMembersService } from './../../services/team-members.service';

@Component({
  selector: 'app-team-members-form',
  templateUrl: './team-members-form.component.html',
  styleUrls: ['./team-members-form.component.css'],
})
export class TeamMembersFormComponent implements OnInit {
  public teamMemberId = 0;
  public item = {} as TeamResource;
  public teams = [] as TeamResource[];
  public loaded = false;
  public title = 'Create Team Member';
  public model = {} as TeamMemberModel;
  public form = {} as FormGroup;
  public subscriptions = [] as Subscription[];

  constructor(
    private readonly teamMembersService: TeamMembersService,
    private readonly teamsService: TeamsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.teamMemberId = Number.parseInt(this.route.snapshot.params['id'], 10);
    this.initializeForm({} as TeamMemberResource);

    this.teamsService.loadTeams({ skip: 0, take: 10000 } as TeamFilter);

    this.subscriptions.push(
      this.teamsService.teams.subscribe((items) => (this.teams = items))
    );

    if (this.teamMemberId) {
      this.title = 'Edit Team Member';
      this.teamMembersService.loadTeamMembers({
        skip: 0,
        take: 1,
        id: this.teamMemberId,
      } as TeamMemberFilter);

      this.subscriptions.push(
        this.teamMembersService.teamMembers.subscribe((items) => {
          if (items.length) {
            const item =
              items.find((item) => item.id === this.teamMemberId) ??
              ({} as TeamMemberResource);
            this.initializeForm(item);
          }
        })
      );
    }
  }

  public async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    if (this.teamMemberId) {
      this.teamMembersService.updateTeamMember(this.teamMemberId, this.model);
    } else {
      this.teamMembersService.createTeamMember(this.model);
    }

    this.navigateBack();
  }

  public navigateBack(): void {
    this.router.navigate(['team/members']);
  }

  private initializeForm(item: TeamMemberResource): void {
    this.form = this.formBuilder.group({
      teamId: [item.team?.id ?? null, Validators.required],
      firstName: [item.firstName ?? '', Validators.required],
      fatherName: [item.fatherName ?? '', Validators.required],
      grandFatherName: [item.grandFatherName ?? '', Validators.required],
      lastName: [item.lastName ?? '', Validators.required],
      position: [item.position ?? '', Validators.required],
      phoneNumber: [item.phoneNumber ?? '', Validators.required],
      description: [item.description ?? '', Validators.required],
    });

    this.subscriptions.push(
      this.form.valueChanges
        .pipe(filter(() => this.form.valid))
        .subscribe((values: TeamMemberModel) => {
          this.model = this.getTeamMemberModel(values);
        })
    );
  }

  private getTeamMemberModel(model: TeamMemberModel): TeamMemberModel {
    return {
      teamId: model.teamId,
      firstName: model.firstName,
      fatherName: model.fatherName,
      grandFatherName: model.grandFatherName,
      lastName: model.lastName,
      phoneNumber: model.phoneNumber,
      position: model.position,
      description: model.description,
    } as TeamMemberModel;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
