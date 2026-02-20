import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoChevronBackSharp, IoMail } from 'react-icons/io5'
import { FaLock } from 'react-icons/fa6'
import { toast } from 'sonner'

import {
  RegisterArgs as BaseRegisterArgs,
  register as registerFn,
} from '@/services/user'
import Image from 'next/image'

type RegisterForm = BaseRegisterArgs & {
  confirmPassword: string
}

const Register = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm<RegisterForm>({
    mode: 'onChange',
  })

  const registerMutation = useMutation({
    mutationFn: (args: BaseRegisterArgs) => registerFn(args),
  })

  const onSubmit: SubmitHandler<RegisterForm> = async args => {
    try {
      if (args.password !== args.confirmPassword) {
        throw new Error('รหัสผ่านไม่ตรงกัน')
      }
      if (args.password.length < 8) {
        throw new Error('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
      }

      await registerMutation.mutateAsync({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: args.password,
        phoneNumber: args.phoneNumber,
      })

      toast.success('สมัครสมาชิกสำเร็จ')
      router.push('/login')
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="absolute left-6 top-6">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
        >
          <IoChevronBackSharp className="w-4" />
          กลับ
        </Link>
      </div>
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-12 md:px-12">
          <div className="flex flex-col items-center gap-4">
            <Image src="/duck.jpg" alt="Learnify Logo" width={56} height={56} />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-gray-500"
            ></button>

            <h1 className="text-center text-2xl font-bold">สมัครสมาชิก</h1>
            <p className="text-center text-sm text-gray-500">
              กรุณากรอกข้อมูลของคุณเพื่อสร้างบัญชีใหม่
            </p>

            <div className="flex gap-4">
              <input
                className="input input-bordered w-full"
                placeholder="ชื่อ"
                {...register('firstName', { required: true })}
              />
              <input
                className="input input-bordered w-full"
                placeholder="นามสกุล"
                {...register('lastName', { required: true })}
              />
            </div>

            <label className="input input-bordered flex items-center gap-2">
              <IoMail />
              <input
                type="email"
                className="grow"
                placeholder="อีเมล"
                {...register('email', { required: true })}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <FaLock />
              <input
                type="password"
                className="grow"
                placeholder="รหัสผ่าน"
                {...register('password', { required: true })}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <FaLock />
              <input
                type="password"
                className="grow"
                placeholder="ยืนยันรหัสผ่าน"
                {...register('confirmPassword', { required: true })}
              />
            </label>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="mt-4 rounded-full bg-blue-500 py-2 font-semibold text-white disabled:bg-gray-400"
            >
              สมัครสมาชิก
            </button>

            <p className="mt-3 text-center text-sm">
              มีบัญชีแล้ว?{' '}
              <Link href="/login" className="text-blue-500 hover:underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </form>
        </div>
        <div className="relative hidden items-center justify-center md:flex">
          <Image
            src="/bg-login.jpg"
            alt="Login Illustration"
            width={800}
            height={800}
            className="rounded-3xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Register
