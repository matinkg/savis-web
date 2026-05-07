'use client';
import Button from '@/components/_modules/button';
import Input from '@/components/_modules/input/inex';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function GetCodeForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      fullName: '',
    },
  });

  const handleRequest = async (data: Object) => {};

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        fullName: '',
        email: '',
      });
    }
  }, [formState, handleRequest, reset]);
  return (
    <form
      onSubmit={handleSubmit(handleRequest)}
      className='flex w-full flex-col gap-y-3 font-peyda-400 text-blue-1050'
    >
      <span className='my-10 block text-center font-peyda-400 text-sm text-blue-1050 lg:text-lg'>
        در صورت نیاز میتوانید به ایمیل دلخواه خود این کارت هدیه را ارسال نمایید
      </span>
      <Input
        label='نام و نام خانوادگی گیرنده'
        labelStyle='text-sm '
        isStar={true}
        type='text'
        validate={{
          ...register('fullName', {
            required: 'لطفا فیلد  نام و نام خانوادگی گیرنده را پرکنید ',
          }),
        }}
        className={`mt-1 h-8 w-full border border-solid bg-white/50 px-3 lg:h-10 ${
          errors.fullName?.message ? 'border-red-600' : 'border-[#D3D8DA]'
        } `}
      >
        <small
          className={
            errors.fullName ? 'block h-7 font-peyda-400 text-red-600' : 'hidden'
          }
        >
          {errors.fullName?.message}
        </small>
      </Input>

      <Input
        label=' ایمیل '
        labelStyle='text-sm '
        isStar={true}
        type='text'
        validate={{
          ...register('email', {
            required: 'لطفا فیلد   ایمیل  را پرکنید ',
          }),
        }}
        className={`mt-1 h-8 w-full border border-solid bg-white/50 px-3 lg:h-10 ${
          errors.email?.message ? 'border-red-600' : 'border-[#D3D8DA]'
        } `}
      >
        <small
          className={
            errors.fullName ? 'block h-7 font-peyda-400 text-red-600' : 'hidden'
          }
        >
          {errors.email?.message}
        </small>
      </Input>

      <textarea
        className='mt-1 w-full border border-solid border-[#D3D8DA] bg-white/50 p-3 font-peyda-400 text-xs lg:text-sm'
        cols={30}
        rows={5}
        placeholder='( اختیاری ، درصورت پر نکردن این قسمت ، به صورت پیشفرض یک متن ارسال خواهد شد)'
      ></textarea>

      <Button className='flex-center mt-6 w-full bg-secendry py-2 text-center font-peyda-400 text-xs text-white lg:mt-10 lg:py-3 lg:text-sm xl:text-lg'>
        ارسال
      </Button>
    </form>
  );
}
