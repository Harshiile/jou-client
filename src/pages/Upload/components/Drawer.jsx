import React from 'react'
import { Drawer, DrawerContent, DrawerTitle } from '../../../components/ui/drawer'
import { Progress } from '../../../components/ui/progress'
import { Loader2 } from 'lucide-react'

const UploaderDrawer = ({ isUploading, setIsUploading, progress }) => {
  const onDrawerChange = () => {
    if (isUploading) return;
    setIsUploading(true)
  }

  return (
    <Drawer open={isUploading} onOpenChange={onDrawerChange}>
      <input
        type='submit'
        value='Upload'
        className='w-full bg-white text-black px-2 py-2 rounded-md mt-4 font-semibold'
      />
      <DrawerContent className='bg-primary w-[55%] mx-auto flex flex-col gap-y-4'>
        <Loader2 className='h-10 w-10 animate-spin mx-auto' />
        <DrawerTitle className='text-center text-white text-xl mb-2'>Uploading</DrawerTitle>
        <Progress value={progress} className='h-3.5 w-[85%] mx-auto mb-5 bg-[#39393b] [&>*]:bg-white' />
      </DrawerContent>
    </Drawer>
  )
}

export default UploaderDrawer