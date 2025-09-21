'use client';
import { usePortfolioStore } from '@/store/portfolioStore';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function PortfolioDetail() {
  const { id } = useParams();
  const portfolio = usePortfolioStore(s => s.getPortfolio(id as string));

  if (!portfolio) return <div className="p-4">ไม่พบข้อมูลนักศึกษา</div>;

  return (
    <div className="form-container">
      <h2 className="mb-4">รายละเอียด Portfolio</h2>

      {portfolio.photo && (
        <img
          src={portfolio.photo}
          className="student-photo mb-4"
          alt="student"
        />
      )}

      <div><b>ชื่อ:</b> {portfolio.firstName}</div>
      <div><b>นามสกุล:</b> {portfolio.lastName}</div>
      <div><b>ที่อยู่:</b> {portfolio.address}</div>
      <div><b>โทรศัพท์:</b> {portfolio.phone}</div>
      <div><b>โรงเรียน:</b> {portfolio.school}</div>
      <div><b>GPA:</b> {portfolio.gpa}</div>
      <div><b>สาขาที่เลือก:</b> {portfolio.major}</div>
      <div><b>มหาวิทยาลัย:</b> {portfolio.university}</div>
      <div><b>ความสามารถพิเศษ:</b> {portfolio.specialSkills}</div>
      <div><b>เหตุผลในการสมัคร:</b> {portfolio.reason}</div>

      <div className="mt-4">
        <b>กิจกรรม:</b>
        <div className="upload-preview">
          {portfolio.activities?.map((url, i) => (
            <img key={i} src={url} alt="activity" />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <b>รางวัล:</b>
        <div className="upload-preview">
          {portfolio.awards?.map((url, i) => (
            <img key={i} src={url} alt="award" />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <b>ผลงาน:</b>
        <div className="upload-preview">
          {portfolio.works?.map((url, i) => (
            <img key={i} src={url} alt="work" />
          ))}
        </div>
      </div>

      <Link href="/teacher" className="text-blue-400 underline block mt-6">
        ← กลับไปหน้ารายชื่อ
      </Link>
    </div>
  );
}
