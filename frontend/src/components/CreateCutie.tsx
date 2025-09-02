import type { SubmitHandler } from 'react-hook-form'
import type { Inputs } from '../@types'
import { useForm } from 'react-hook-form'
import { useCreateCutie } from '../service/queries.ts'
import './style.css'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function CreateCutie({ setAdd }: { setAdd: Function }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>()
  const createCutieMutation = useCreateCutie()

  const onSubmit: SubmitHandler<Inputs> = (cutie) => {
    setAdd(true)
    createCutieMutation.mutate(cutie, {
      onSuccess: () => {
        reset()
      },
    })
  }
  return (

    <form className="flex-col flex justify-between items-center gap-3  relative" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="bg-zinc-600 p-2 w-[400px] text-center rounded-lg text-white placeholder:text-center"
        placeholder="name of a cutie"
        {...register('name', { required: true })}
        autoComplete="off"
      />

      {errors.name && (
        <div
          className="absolute -top-[2.8rem] transition-all duration-300 ease-linear bg-neutral-800 p-2 rounded-lg"
        >
          Name
          plz :C
        </div>
      )}
      <div className="content__item cursor-pointer">
        <a href="#" className="link link--iocaste">
          <button type="submit">Submit</button>
          <svg
            className="link__graphic link__graphic--slide"
            width="300%"
            height="100%"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
            >
            </path>
          </svg>
        </a>
      </div>
    </form>

  )
}
