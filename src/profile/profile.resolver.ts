import { Query, Resolver } from '@nestjs/graphql';
import { Profile } from './models/profile.model';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { description: 'Returns the public business card.' })
  profile(): Promise<Profile> {
    return this.profileService.getPublicProfile();
  }
}
