import { DropdownProps } from '@/types'
import React, { startTransition, useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { ICategory } from '@/lib/database/models/category.model'
import { Input } from '../ui/input'
import { createCategory, deleteCategory, getAllCategories } from '@/lib/actions/category.actions'
import { set } from 'mongoose'
import { Checkbox } from '../ui/checkbox'
import { Trash2 } from 'lucide-react'

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])

  const [newCategory, setNewCategory] = useState('')
  const [deletedCategory, setDeletedCategory] = useState('')

  // create new category handler
  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim()
    })
      .then((category) => {
        setCategories((prevState) => [...prevState, category])
      })
  }

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
    setDeletedCategory(categoryId)
  };


  // Get list of all categories
  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories()
      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories()
  }, [deletedCategory])


  return (
    <>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {
            categories.length > 0 && categories.map((category) => (
              <SelectItem key={category._id} value={category._id} className='select-item p-regular-14'>
                {category.name}
              </SelectItem>
            ))
          }

          <AlertDialog>
            <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>
              Create New Category
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
              <AlertDialogHeader>
                <AlertDialogTitle>New Category</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type='text'
                    pattern='Category Name'
                    className='input-field mt-3'
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => startTransition(handleAddCategory)} >Add</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


          <AlertDialog>
            <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>
              Manage Categories
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
              <AlertDialogHeader>
                <AlertDialogTitle>Manage Categories</AlertDialogTitle>
                {
                  categories.length > 0 && categories.map((category) => (
                    <AlertDialogDescription key={category._id} className='flex justify-start gap-5'>
                      <Trash2
                        className='text-red-500 hover:text-primary-50 hover:bg-red-700 active:text-red-800 cursor-pointer transition-colors duration-200 p-1 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 rounded'
                        onClick={() => {
                          startTransition(() => handleDeleteCategory(category._id))
                        }}
                      />
                      {category.name}
                    </AlertDialogDescription>
                  ))
                }

              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='button col-span-2 hover:bg-primary-500 hover:text-primary-50 '>Return</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </SelectContent>
      </Select>
    </>
  )
}

export default Dropdown