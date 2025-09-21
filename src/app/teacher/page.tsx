'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';

type SortKey = 'firstName' | 'lastName' | 'gpa';

export default function TeacherPage() {
  const portfolios = usePortfolioStore(s => s.portfolios);
  //const removePortfolio = usePortfolioStore(s => s.removePortfolio);

  const [sortKey, setSortKey] = useState<SortKey>('firstName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sorted = [...portfolios].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA === undefined || valB === undefined) return 0;

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    return sortOrder === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="table-container">
      <h2>รายชื่อนักศึกษา TCAS69</h2>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')} className="cursor-pointer">ชื่อ</th>
            <th onClick={() => handleSort('lastName')} className="cursor-pointer">นามสกุล</th>
            <th onClick={() => handleSort('gpa')} className="cursor-pointer">GPA</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(p => (
            <tr key={p.id}>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.gpa}</td>
              <td className="flex gap-3">
                <Link href={`/teacher/${p.id}`} className="text-blue-500 underline">
                  ดูรายละเอียด
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold">
          ← กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
}
