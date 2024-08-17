// import Cookies from 'universal-cookie';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../config/firebase';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

// const cookies = new Cookies();

const fieldSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FieldValueType = z.infer<typeof fieldSchema>;

const defaultValues: FieldValueType = {
  email: '',
  password: '',
};

interface SignInProps {}

/**
 * NOT USING THIS COMPONENT
 * @returns
 */
const SignUp: React.FC<SignInProps> = () => {
  const form = useForm<FieldValueType>({
    defaultValues,
    resolver: zodResolver(fieldSchema),
  });

  const onSubmit = async (data: FieldValueType) => {
    // TODO: Handle sign in with email and password
    console.log(data);
  };

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form
          className="w-[50%] flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="on" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button className="mt-8" type="submit">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
