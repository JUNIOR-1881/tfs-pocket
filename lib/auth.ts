import { SignJWT, jwtVerify } from 'jose'; import { cookies } from 'next/headers';
const key=new TextEncoder().encode(process.env.AUTH_SECRET||'development-only-change-me-32-bytes');
export type Session={id:string;role:'CUSTOMER'|'ADMIN'|'REVIEWER';email:string};
export async function createSession(s:Session){return new SignJWT(s).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('8h').sign(key)}
export async function getSession():Promise<Session|null>{const token=(await cookies()).get('tfs_session')?.value;if(!token)return null;try{return (await jwtVerify(token,key)).payload as unknown as Session}catch{return null}}
