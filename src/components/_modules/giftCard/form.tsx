'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormProps {
  setRecipientInfo: (info: { email: string; fullName: string; message: string }) => void;
}

export default function Form({ setRecipientInfo }: FormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState,
    formState: { isSubmitSuccessful },
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      message: '',
    },
  });

  const handleContactUs = async (data: Object) => {};

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ fullName: '', email: '', message: '' });
    }
  }, [formState, handleContactUs, reset]);

  useEffect(() => {
    const subscription = watch((data) => setRecipientInfo(data as any));
    return () => subscription.unsubscribe();
  }, [watch, setRecipientInfo]);

  return (
    <form className='space-y-5'>
      <div className='flex flex-col gap-y-[1px]'>
        <label className='font-peyda-400 text-xs text-blue-1050 lg:text-base'>
          ایمیل
          <span className='text-red-250'>*</span>
        </label>
        <input
          {...register('email', {
            required: 'لطفا فیلد  ایمیل را پرکنید ',
          })}
          type='text'
          className='h-10 w-full border border-solid border-[#D3D8DA] bg-white/50 px-3'
        />
        {errors.email?.message && <small className='block h-7 font-peyda-400 text-red-600'>
          {errors.email?.message}
        </small>}
      </div>
      <div className='flex flex-col gap-y-[1px]'>
        <label className='font-peyda-400 text-xs text-blue-1050 lg:text-base'>
          نام و نام خانوادگی گیرنده
          <span className='text-red-250'>*</span>
        </label>
        <input
          {...register('fullName', {
            required: 'لطفا فیلد   نام و نام خانوادگی گیرنده را پرکنید ',
          })}
          type='text'
          className='h-10 w-full border border-solid border-[#D3D8DA] bg-white/50 px-3'
        />
        {errors.fullName?.message && <small className='block h-7 font-peyda-400 text-red-600'>
          {errors.fullName?.message}
        </small>}
      </div>

      <div className='flex flex-col gap-y-[1px]'>
        <label className='font-peyda-400 text-xs text-blue-1050 lg:text-base'>
          متن پیام
        </label>
        <textarea
          {...register('message', {
            required: 'لطفا فیلد  پیام را پرکنید ',
          })}
          placeholder='( اختیاری ، درصورت پر نکردن این قسمت ، به صورت پیشفرض یک متن ارسال خواهد شد)'
          className='w-full border border-solid border-[#D3D8DA] bg-white/50 p-3 font-peyda-400 text-xs lg:text-sm'
          rows={5}
        ></textarea>
        {errors.message?.message && <small className='block h-7 font-peyda-400 text-red-600'>
          {errors.message?.message}
        </small>}
      </div>
    </form>
  );
}
