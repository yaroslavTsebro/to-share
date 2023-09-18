import { RefreshTokenPayload } from './refresh-token-payload.interface';

export interface AccessTokenPayload extends RefreshTokenPayload {
  username: string;
}
