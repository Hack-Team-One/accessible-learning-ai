import * as randomString from 'random-string';

export default function generateRandomCodeOrToken() {
  return randomString({ length: 50 }) as string;
}
