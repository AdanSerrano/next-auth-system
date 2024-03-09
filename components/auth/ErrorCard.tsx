
import CardWrapper from '@/components/auth/CardWrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export const ErrorCard = () => {
    return (
        <CardWrapper headerLabel='Ops! something went wrong!'
            backButtonHref='/auth/login'
            backButtonLabel='back to login' >

            <div className='w-full flex items-center justify-center'>
                <ExclamationTriangleIcon className='text-destructive' />
            </div>
        </CardWrapper>
    )
}
