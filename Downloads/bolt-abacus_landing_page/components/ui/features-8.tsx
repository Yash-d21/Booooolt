import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Zap, Trophy, TrendingUp, Award, Clock } from 'lucide-react';

export function Features8() {
    return (
        <div className="w-full text-white">
            <div className="mx-auto max-w-4xl lg:max-w-6xl px-4">
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-6 gap-4">

                        {/* 1. Practice Every Single Day */}
                        <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 bg-neutral-900 border-white/10 hover:border-indigo-500/50 transition-colors">
                            <CardContent className="relative m-auto size-fit pt-6 pb-6">
                                <div className="relative flex h-24 w-56 items-center">
                                    <svg className="text-indigo-500/20 absolute inset-0 size-full" viewBox="0 0 254 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <span className="mx-auto block w-fit text-5xl font-black text-white">100%</span>
                                </div>
                                <h2 className="mt-4 text-center text-xl font-bold text-white max-w-xs mx-auto">Practice Every Single Day</h2>
                                <p className="text-center text-sm text-neutral-400 mt-2">Built into their routine</p>
                            </CardContent>
                        </Card>

                        {/* 2. Know Right Away If You Got It */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-neutral-900 border-white/10 hover:border-emerald-500/50 transition-colors">
                            <CardContent className="pt-6 relative flex flex-col items-center justify-center">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] pointer-events-none rounded-full" />
                                <div className="relative mx-auto flex aspect-square size-32 items-center justify-center rounded-full border border-white/10 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                                    <Zap className="size-12 text-emerald-400" />
                                </div>
                                <div className="relative z-10 mt-6 space-y-2 text-center">
                                    <h2 className="text-xl font-bold text-white">Know Right Away</h2>
                                    <p className="text-sm text-neutral-400">No waiting, no guessing</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 3. Speed Rounds & Fun Drills */}
                        <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 bg-neutral-900 border-white/10 hover:border-pink-500/50 transition-colors">
                            <CardContent className="pt-6">
                                <div className="pt-6 lg:px-6 relative flex justify-center items-center overflow-visible">
                                    <div className="absolute right-0 top-0 w-32 h-32 bg-pink-500/10 blur-[40px] pointer-events-none rounded-full" />
                                    <svg className="text-white/20 w-full relative z-10" viewBox="0 0 386 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="386" height="123" rx="10" />
                                        <path
                                            className="text-pink-500"
                                            d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                                <div className="relative z-10 mt-[26px] space-y-2 text-center pb-2">
                                    <h2 className="text-xl font-bold text-white">Speed Rounds & Drills</h2>
                                    <p className="text-sm text-neutral-400">Feels like playing, works like practice</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 4. See How Far You Have Come */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-neutral-900 border-white/10 hover:border-blue-500/50 transition-colors">
                            <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 blur-[60px] pointer-events-none rounded-full" />
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                    <div className="relative flex aspect-square size-12 items-center justify-center rounded-full border border-white/10 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                                        <TrendingUp className="size-5 text-blue-400" />
                                    </div>
                                    <div className="space-y-2 pb-6">
                                        <h2 className="text-xl font-bold text-white">See How Far You Have Come</h2>
                                        <p className="text-sm text-neutral-400">Speed and score, tracked over time.</p>
                                    </div>
                                </div>
                                <div className="relative mt-6 sm:-my-6 sm:-mr-6 border-l border-white/10 before:absolute before:inset-0 before:mx-auto before:w-px">
                                    <div className="relative flex h-full flex-col justify-center gap-6 py-6 p-6 pb-[28px] overflow-hidden">
                                        {/* Chart aesthetic */}
                                        <div className="w-full h-8 bg-blue-500/10 rounded overflow-hidden flex">
                                            <div className="h-full bg-blue-500 w-[40%]" />
                                            <span className="text-[10px] my-auto ml-2 text-blue-300 font-bold uppercase">Week 1</span>
                                        </div>
                                        <div className="w-full h-8 bg-blue-500/10 rounded overflow-hidden flex">
                                            <div className="h-full bg-blue-500 w-[65%]" />
                                            <span className="text-[10px] my-auto ml-2 text-blue-300 font-bold uppercase">Week 2</span>
                                        </div>
                                        <div className="w-full h-8 bg-blue-500/10 rounded overflow-hidden flex">
                                            <div className="h-full bg-blue-500 w-[95%]" />
                                            <span className="text-[10px] my-auto ml-2 text-blue-300 font-bold uppercase">Week 3</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 5. Compete with Students Worldwide */}
                        <Card className="relative col-span-full overflow-hidden lg:col-span-3 bg-neutral-900 border-white/10 hover:border-gold-500/50 transition-colors">
                            <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 blur-[60px] pointer-events-none rounded-full" />
                                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                                    <div className="relative flex aspect-square size-12 items-center justify-center rounded-full border border-white/10 before:absolute before:-inset-2 before:rounded-full before:border before:border-white/5">
                                        <Trophy className="size-5 text-gold-400" />
                                    </div>
                                    <div className="space-y-2 pb-6">
                                        <h2 className="text-xl font-bold text-white">Compete Worldwide</h2>
                                        <p className="text-sm text-neutral-400">Real rankings every week. Real bragging rights.</p>
                                    </div>
                                </div>
                                <div className="relative mt-6 sm:-my-6 sm:-mr-6 border-l border-white/10 before:absolute before:inset-0 before:mx-auto before:w-px">
                                    <div className="relative flex h-full flex-col justify-center space-y-6 py-6 pb-9">
                                        <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                                            <span className="block h-fit rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-white">#1 • Ananya</span>
                                            <div className="ring-background size-7 ring-4 rounded-full ring-neutral-900 border border-gold-500">
                                                <img className="size-full rounded-full object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150" alt="" />
                                            </div>
                                        </div>
                                        <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                                            <div className="ring-background size-8 ring-4 rounded-full ring-neutral-900 border border-neutral-600">
                                                <img className="size-full rounded-full object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150" alt="" />
                                            </div>
                                            <span className="block h-fit rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-neutral-300">#2 • Rahul</span>
                                        </div>
                                        <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                                            <span className="block h-fit rounded border border-white/10 bg-black/50 px-2 py-1 text-xs text-neutral-400">#3 • Kavya</span>
                                            <div className="ring-background size-7 ring-4 rounded-full ring-neutral-900 border border-neutral-700">
                                                <img className="size-full rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 6. Earn Certificates as You Level Up */}
                        <Card className="relative col-span-full overflow-hidden bg-neutral-900 border-white/10 hover:border-purple-500/50 transition-colors">
                            <CardContent className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-500/5 blur-[100px] pointer-events-none" />
                                <div className="flex-1 space-y-4 relative z-10 text-center md:text-left text-white max-w-xl">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 mb-6 mx-auto md:mx-0">
                                        <Award size={24} />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold">Earn Certificates as You Level Up</h2>
                                    <p className="text-neutral-400 text-lg">Every level completed comes with a certificate worth putting on the wall. Students work for it — and feel proud when they get it.</p>
                                </div>
                                <div className="flex-shrink-0 relative z-10">
                                    <div className="w-64 h-48 bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center relative">
                                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
                                        <div className="text-center px-4">
                                            <Award className="mx-auto size-10 text-gold-400 mb-2 drop-shadow-lg" />
                                            <h4 className="text-white font-serif tracking-widest uppercase text-xs mb-1">Certificate of Achievement</h4>
                                            <div className="w-32 h-px bg-white/10 mx-auto my-3" />
                                            <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-widest">Level 2 Mastery</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}
