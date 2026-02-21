import PublicLayout from '@/components/layout/PublicLayout'

export default function Loading() {
    return (
        <PublicLayout>
            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="animate-pulse">
                    {/* Breadcrumb Skeleton */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-4 w-16 bg-slate-200 rounded"></div>
                        <div className="h-4 w-4 bg-slate-200 rounded"></div>
                        <div className="h-4 w-24 bg-slate-200 rounded"></div>
                    </div>

                    {/* Header Skeleton */}
                    <div className="mb-8">
                        <div className="h-10 w-3/4 bg-slate-200 rounded-lg mb-6"></div>
                        <div className="flex items-center gap-4 py-4 border-b border-slate-100">
                            <div className="h-5 w-32 bg-slate-200 rounded"></div>
                            <div className="h-5 w-32 bg-slate-200 rounded"></div>
                        </div>
                    </div>

                    {/* Image Skeleton */}
                    <div className="mb-10 rounded-2xl overflow-hidden aspect-video bg-slate-200"></div>

                    {/* Content Skeleton */}
                    <div className="space-y-4">
                        <div className="h-4 w-full bg-slate-200 rounded"></div>
                        <div className="h-4 w-full bg-slate-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                        <div className="h-4 w-full bg-slate-200 rounded"></div>
                        <div className="h-4 w-4/5 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
