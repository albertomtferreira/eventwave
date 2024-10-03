"use client"
import { EventFormProps } from '@/types'
import React, { useState } from 'react'
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
import { Checkbox } from "@/components/ui/checkbox"
import { eventFormSchema } from '@/lib/validator'
import { eventDefaultValues } from '@/constants'
import Dropdown from './Dropdown'
import { FileUploader } from './FileUploader'
import Image from 'next/image'
import { calendar_image, location_image, price_image, url_image } from '@/constants/data'
import DatePicker from "react-datepicker";
import { useUploadThing } from '@/lib/uploadthing'
import "react-datepicker/dist/react-datepicker.css";
import { handleError } from '@/lib/utils'
import { Router } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createEvent } from '@/lib/actions/event.actions'


const EventForm = ({ userId, type }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const initialValues = eventDefaultValues
  const { startUpload } = useUploadThing("imageUploader")
  const router = useRouter()

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {

    let uploadedImageUrl = values.imageUrl

    if (files.length > 0) {
      const uploadedImages = await startUpload(files)
      if (!uploadedImages) {
        return
      }
      uploadedImageUrl = uploadedImages[0].url
    }
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })
        if (newEvent) {
          form.reset()
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        handleError(error)
      }
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        {/* Event Title & Category */}
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

        {/* Event Description & File Uploader */}
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

          {/* Event File Uploader */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl className='h-72'>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Event Location */}
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="locality"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                    <Image
                      src={location_image.image}
                      alt={location_image.alt}
                      width={location_image.width}
                      height={location_image.height}
                    />
                    <Input placeholder="Event location or Online" {...field} className='input-field' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Event Start & End Date */}
        <div className='flex flex-col gap-5 md:flex-row'>

          {/* Event Start Date */}
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                    <Image
                      src={calendar_image.image}
                      alt={calendar_image.alt}
                      width={calendar_image.width}
                      height={calendar_image.height}
                      className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap text-gray-600'>Start Date</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat="dd/MM/yyyy hh:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event End Date */}
          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                    <Image
                      src={calendar_image.image}
                      alt={calendar_image.alt}
                      width={calendar_image.width}
                      height={calendar_image.height}
                      className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap text-gray-600'>End Date</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date | null) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat="dd/MM/yyyy hh:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Event Price */}
        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                    <Image
                      src={price_image.image}
                      alt={price_image.alt}
                      width={price_image.width}
                      height={price_image.height}
                    />
                    <Input type='number' placeholder="Event price" {...field} className='p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0' />

                    {/* Event Free Ticket - Checkbox */}
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem >
                          <FormControl>
                            <div className='flex items-center'>
                              <label htmlFor='isFree' className='whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Free Ticket</label>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="isFree"
                                className='mr-2 h-5 w-5 border-2 border-primary-500' />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Event URL */}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2'>
                    <Image
                      src={url_image.image}
                      alt={url_image.alt}
                      width={url_image.width}
                      height={url_image.height}
                    />
                    <Input placeholder="url" {...field} className='input-field' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className='button col-span-2 w-full'
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {
            form.formState.isSubmitting ? "Submitting..." : `${type} Event`
          }
        </Button>
      </form>
    </Form>
  )
}

export default EventForm