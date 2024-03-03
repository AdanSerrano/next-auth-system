import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

export default function Social() {
    return (
        <div className='flex items-center gap-x-2 w-full '>
            <Button
                variant='outline'
                size='lg'
                className='w-full'
                onClick={() => { alert('Google') }}
            >
                <FcGoogle />
            </Button>
            <Button
                variant='outline'
                size='lg'
                className='w-full'
                onClick={() => { }}
            >
                <FaGithub className='h-5 w-5' />
            </Button>
        </div>
    )
}
