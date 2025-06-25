import { compareSync, hashSync } from 'bcryptjs';

export default class EncryptAdapter {
  static hash(text: string): string {
    return hashSync(text);
  }

  static compare(text: string, hashed: string): boolean {
    return compareSync(text, hashed);
  }
}
