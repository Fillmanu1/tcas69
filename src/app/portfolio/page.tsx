'use client';
import { useForm } from 'react-hook-form';
import { usePortfolioStore, Portfolio } from '@/store/portfolioStore';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

type FormData = Omit<Portfolio, 'id' | 'photo' | 'activities' | 'awards' | 'works'>;

export default function PortfolioForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const addPortfolio = usePortfolioStore((s) => s.addPortfolio);

  const [photoPreview, setPhotoPreview] = useState<string>();
  const [activitiesPreview, setActivitiesPreview] = useState<string[]>([]);
  const [awardsPreview, setAwardsPreview] = useState<string[]>([]);
  const [worksPreview, setWorksPreview] = useState<string[]>([]);

   // 📤 handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setPreview: (urls: string[]) => void, single = false) => {
    const files = e.target.files;
    if (!files) return;

    if (single) {
      setPreview([URL.createObjectURL(files[0])]);
    } else {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreview(urls);
    }
  };

  const onSubmit = (data: FormData) => {
    addPortfolio({
      id: uuidv4(),
      ...data,
      photo: photoPreview,
      activities: activitiesPreview,
      awards: awardsPreview,
      works: worksPreview,
    });
    reset();
    setPhotoPreview(undefined);
    setActivitiesPreview([]);
    setAwardsPreview([]);
    setWorksPreview([]);
    alert('บันทึกข้อมูลเรียบร้อย ✅');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-400 border-b border-blue-500 pb-2 mb-6">
          แบบฟอร์ม Portfolio TCAS69
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 text-white"
        >
          <div>
            <label className="block mb-1">ชื่อ</label>
            <input {...register('firstName', { required: true })} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <div>
            <label className="block mb-1">นามสกุล</label>
            <input {...register('lastName', { required: true })} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <div>
            <label className="block mb-1">ที่อยู่</label>
            <input {...register('address')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <div>
            <label className="block mb-1">หมายเลขโทรศัพท์</label>
            <input {...register('phone')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <div>
            <label className="block mb-1">โรงเรียน</label>
            <input {...register('school')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <div>
            <label className="block mb-1">GPA</label>
            <input type="number" step="0.01" {...register('gpa', { valueAsNumber: true })} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <div>
            <label className="block mb-1">มหาวิทยาลัย</label>
            <input {...register('university')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <div>
            <label className="block mb-1">สาขาที่เลือก</label>
            <input {...register('major')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" />
          </div>

          <div className="col-span-2">
            <label className="block mb-1">ความสามารถพิเศษ</label>
            <textarea {...register('specialSkills')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" rows={2}></textarea>
          </div>

          <div className="col-span-2">
            <label className="block mb-1">เหตุผลในการสมัครเข้าเรียน</label>
            <textarea {...register('reason')} className="w-full p-2 rounded bg-gray-700 border border-gray-600" rows={3}></textarea>
          </div>

           {/* Upload */}
        <div className="col-span-2">
          <label className="block mb-1">📸 รูปนักเรียน:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileUpload(e, (urls) => setPhotoPreview(urls[0]), true)
            }
          />
          {photoPreview && (
            <img src={photoPreview} alt="student" className="student-photo" />
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-1">🎯 กิจกรรม:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setActivitiesPreview)}
          />
          <div className="upload-preview">
            {activitiesPreview.map((url, i) => (
              <img key={i} src={url} alt={`activity-${i}`} />
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block mb-1">🏆 รางวัล:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setAwardsPreview)}
          />
          <div className="upload-preview">
            {awardsPreview.map((url, i) => (
              <img key={i} src={url} alt={`award-${i}`} />
            ))}
          </div>
        </div>

          <div className="col-span-2">
          <label className="block mb-1">📄 ผลงาน:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e, setWorksPreview)}
          />

          <div className="upload-preview">
            {worksPreview.map((url, i) => (
              <img key={i} src={url} alt={`work-${i}`} />
            ))}
          </div>
        </div>

          <div className="col-span-2 flex justify-between">
            <Link href="/" className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded-lg font-semibold">
              กลับหน้าหลัก
            </Link>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold">
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
