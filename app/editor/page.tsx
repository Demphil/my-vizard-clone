'use client';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Loader2, ChevronLeft, Diamond, Wand2, CheckCircle, Info, ImageUp, ChevronDown, Settings, Link as LinkIcon, Youtube } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

// --- Data for UI ---
const visualTemplates = [
  { id: 'rec1', name: 'Recommended 1', imageUrl: '/placeholder.svg' },
  { id: 'rec2', name: 'Recommended 2', imageUrl: '/placeholder.svg' },
  { id: 'rec3', name: 'Recommended 3', imageUrl: '/placeholder.svg' },
  { id: 'rec4', name: 'Recommended 4', imageUrl: '/placeholder.svg' },
  { id: 'simple', name: 'Simple', imageUrl: '/placeholder.svg' },
];
const clipLengthOptions = ["<30s", "30s-60s", "60s-90s", "90s-3min"];
const ratioOptions = [ { value: '9:16', label: '9:16' }, { value: '1:1', label: '1:1' }];

// --- Helper UI Components ---
const LabelledSelect = ({label, value, onValueChange, options}:any) => (
  <div className="space-y-2">
    <Label className="text-sm font-semibold flex items-center">{label}</Label>
    <Select value={value} onValueChange={() => { /* Do nothing */ }}>
      <SelectTrigger className="w-full bg-gray-50 border-gray-200 rounded-md h-10">
        <SelectValue/>
      </SelectTrigger>
      <SelectContent>
        {options.map((o:any) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
);

const LabelledPopoverSelect = ({label, values, onValuesChange, options}:any) => (
  <div className="space-y-2">
    <Label className="text-sm font-semibold flex items-center">{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between font-normal bg-gray-50 border-gray-200 rounded-md h-10">
          <span>{values.join(', ') || 'Select...'}</span> <ChevronDown size={16}/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        {options.map((option: string) => (
          <Label key={option} className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer">
            <Input type="checkbox" className="h-4 w-4 rounded"
              checked={values.includes(option)}
              onChange={() => { /* Do nothing */ }}
            />
            <span>{option}</span>
          </Label>
        ))}
      </PopoverContent>
    </Popover>
  </div>
);


const LabelledSwitch = ({label, checked, onCheckedChange}:any) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <Label className="text-sm font-semibold flex items-center space-x-2">{label} <Info size={14} className="text-gray-400"/></Label>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);

const LabelledDialogTemplate = ({selected, onSelect}:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState(selected);
  const handleApply = () => { onSelect(tempSelected); setIsOpen(false); };
  const displayName = selected?.name || 'Select...';
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-full text-left p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="font-semibold flex items-center space-x-2"><ImageUp size={16}/> <span>Template</span> <Info size={14} className="text-gray-400"/></span>
            <span>{displayName} <ChevronDown size={16} className="inline"/></span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader><DialogTitle>Choose a template</DialogTitle></DialogHeader>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 py-4">
          {visualTemplates.map(t => (
            <div key={t.id} onClick={() => setTempSelected(t)} className={`cursor-pointer rounded-md border-2 ${tempSelected.id === t.id ? 'border-purple-500' : 'border-transparent'}`}>
              <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
                <Image src={t.imageUrl} alt={t.name} width={150} height={100} className="object-cover"/>
              </div>
              <p className="text-xs text-center p-1">{t.name}</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function EditorPageContent() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratio, setRatio] = useState('9:16');
  const [clipLength, setClipLength] = useState(['60s-90s']);
  const [removeSilences, setRemoveSilences] = useState(true);
  const [autoBroll, setAutoBroll] = useState(false);
  const [autoEmoji, setAutoEmoji] = useState(true);
  const [highlightKeywords, setHighlightKeywords] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(visualTemplates[0]);
  const [customPrompt, setCustomPrompt] = useState('false');
  const [autoSchedule, setAutoSchedule] = useState(true);

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    // simulate waiting
    setTimeout(() => {
      router.push("/processing");
    }, 1000);
  };

  return (
    <div className="bg-custom-gradient min-h-screen p-4 sm:p-6 text-gray-800">
      <header className="max-w-2xl mx-auto mb-4 flex justify-between items-center text-white">
        <Link href="/" className="inline-flex items-center space-x-2 text-sm hover:opacity-80"><ChevronLeft size={16}/> Back to home</Link>
        <Button variant="outline" className="bg-yellow-400 text-black text-xs font-bold h-8"><Diamond size={12}/> Upgrade</Button>
      </header>

      <main className="max-w-2xl mx-auto space-y-4">
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl">
          <CardContent className="p-3 flex items-center space-x-3">
            <Image src={'/placeholder.svg'} alt="Video thumbnail" width={100} height={56} className="rounded-lg object-cover" unoptimized/>
            <div className="flex-grow">
              <p className="text-sm font-semibold truncate">demo-video.mp4</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                <span className="px-1.5 py-0.5 bg-gray-200 rounded-md">1080p</span>
                <span className="text-green-600 font-semibold flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1"/> Upload successful
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <LabelledSelect label="Ratio" value={ratio} onValueChange={setRatio} options={ratioOptions} />
            <LabelledPopoverSelect label="Clip length" values={clipLength} onValuesChange={setClipLength} options={clipLengthOptions} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <LabelledSwitch label="Remove silences" checked={removeSilences} onCheckedChange={setRemoveSilences} />
            <LabelledSwitch label="Auto B-roll" checked={autoBroll} onCheckedChange={setAutoBroll} />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Style</h3>
            <div className="space-y-2">
              <LabelledSwitch label="Auto emoji" checked={autoEmoji} onCheckedChange={setAutoEmoji} />
              <LabelledSwitch label="Highlight keywords" checked={highlightKeywords} onCheckedChange={setHighlightKeywords} />
              <LabelledDialogTemplate selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase">Schedule & publish</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <Label className="font-semibold">Auto schedule and post</Label>
                <Switch checked={autoSchedule} onCheckedChange={setAutoSchedule} />
              </div>
              <p className="text-xs text-gray-500 mt-1">All viral clips will be scheduled and posted automatically.</p>
              <div className="mt-4 flex items-center space-x-2">
                <Image src={'/placeholder.svg'} alt="Avatar" width={24} height={24} className="rounded-full"/>
                <span className="text-sm font-semibold">Demo User</span>
                <Button variant="ghost" size="sm" className="ml-auto text-xs"><Settings size={14}/> Settings</Button>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button variant="outline" size="sm" className="w-full text-xs"><LinkIcon size={14}/> Link TikTok</Button>
                <Button variant="outline" size="sm" className="w-full text-xs"><Youtube size={14}/> Link YouTube</Button>
              </div>
            </div>
          </div>

          <Button onClick={handleFormSubmit} disabled={isSubmitting} className="w-full text-base font-bold h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 text-white rounded-full">
            <Wand2 size={20} className="mr-2"/> Get AI clips & Schedule
          </Button>
        </Card>
      </main>
    </div>
  );
}

export default function EditorPage() {
  return <Suspense><EditorPageContent /></Suspense>;
}
