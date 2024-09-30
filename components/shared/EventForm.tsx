"use client"
import { EventFormProps } from '@/types'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from '@/lib/validator'
import { eventDefaultValues } from '@/constants'
import Dropdown from './Dropdown'


const EventForm = ({ userId, type }: EventFormProps) => {

  const initialValues = eventDefaultValues

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  })

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className='flex flex-col gap-5 md:flex-row'>
          {/* Event Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder="Event title" {...field} className='input-field' />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Event Category */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Dropdown onChangeHandler={field.onChange} value={field.value} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col gap-5 md:flex-row'>
          {/* Event Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='h-72'>
                  <Textarea placeholder="Description" {...field} className='textarea rounded-2xl' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default EventForm