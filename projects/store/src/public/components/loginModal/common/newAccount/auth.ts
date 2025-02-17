// import { connectionAPIPost } from '@4miga/services/connectionAPI/connection';
// import { SignupFormSchema, FormState } from './definitions'
// import { apiUrl } from 'api/apiUrl';
 
// export async function signup(state: FormState, formData: FormData) {
//   // Validate form fields
//   const validatedFields = SignupFormSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   })
 
//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     }
//   }
 
//   const { email, password } = validatedFields.data

//   try {
//     // Fazer a requisição assíncrona corretamente
//     const response = await connectionAPIPost('/auth', { email, password }, apiUrl);

//     return {
//       message: 'Login realizado com sucesso!',
//     };
//   } catch (error) {
//     return {
//       message: 'Erro ao realizar login',
//       errors: { general: ['Falha na autenticação'] },
//     };
//   }
// }

//   // const handleLogin = async () => {
//   //     const body = {
//   //       email,
//   //       password,
//   //     };
//   //     // cat /etc/resolv.conf | grep nameserver | awk '{print $2}' PROMPT TO FIND NON WSL2 IP
//   //     const response = await connectionAPIPost("/auth", body, apiUrl);
//   //     return console.log(response);
//   //   };
  
//   // return handleLogin()

