import UserEntity from '@/domain/entities/user.entity';

export default interface AuthTokenOutputDTO {
  accessToken: string;
  user: UserEntity;
}
