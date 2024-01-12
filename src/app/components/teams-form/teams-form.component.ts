import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { PatientResource } from 'src/app/api-client-services/patients/resources/patient-resource';
import { TeamResource } from 'src/app/api-client-services/teams/Resources/team-resource';
import { TeamFilter } from 'src/app/api-client-services/teams/filters/team-filter';
import { TeamModel } from 'src/app/api-client-services/teams/models/team-model';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams-form',
  templateUrl: './teams-form.component.html',
  styleUrls: ['./teams-form.component.css'],
})
export class TeamsFormComponent implements OnInit {
  public teamId = 0;
  public loaded = false;
  public title = 'Create Team';
  public model = {} as TeamModel;
  public form = {} as FormGroup;
  public subscriptions = [] as Subscription[];

  constructor(
    private readonly teamsService: TeamsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.teamId = Number.parseInt(this.route.snapshot.params['id'], 10);

    this.initializeForm({} as TeamResource);

    if (this.teamId) {
      this.title = 'Edit Team';
      this.teamsService.loadTeams({
        skip: 0,
        take: 1,
        id: this.teamId,
      } as TeamFilter);

      this.subscriptions.push(
        this.teamsService.teams.subscribe((items) => {
          if (items.length) {
            const item =
              items.find((item) => item.id === this.teamId) ??
              ({} as TeamResource);
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

    if (this.teamId) {
      this.teamsService.updateTeam(this.teamId, this.model);
    } else {
      this.teamsService.createTeam(this.model);
    }

    this.navigateBack();
  }

  public navigateBack(): void {
    this.router.navigate(['teams']);
  }

  private initializeForm(item: TeamResource): void {
    this.form = this.formBuilder.group({
      name: [item.name ?? '', Validators.required],
      description: [item.description ?? ''],
    });

    this.subscriptions.push(
      this.form.valueChanges
        .pipe(filter(() => this.form.valid))
        .subscribe((values) => {
          this.model = this.getTeamModel(values);
        })
    );
  }

  private getTeamModel(model: TeamModel): TeamModel {
    return {
      name: model.name,
      description: model.description,
    } as TeamModel;
  }
  public ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
