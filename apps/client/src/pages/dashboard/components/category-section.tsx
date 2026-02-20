import { useState } from 'react'
import { CalendarClock, Folder, Pencil, Plus, Trash2 } from 'lucide-react'

export default function CategorySection({
  title,
  tasks,
  categoryId,
  getStatusStyle,
  onStatusChange,
  onEdit,
  onDelete,
  onCreate,
  onDeleteCategory,
}: any) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <Folder className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              {tasks.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onCreate(categoryId)}
              className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">เพิ่มงาน</span>
            </button>

            {categoryId && onDeleteCategory && (
              <button
                onClick={() => setIsDeleteDialogOpen(true)}
                className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600"
                title="ลบหมวดหมู่"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col divide-y divide-gray-100">
          {tasks.map((task: any) => (
            <div
              key={task.id}
              className="flex flex-col justify-between gap-4 px-6 py-4 transition-colors hover:bg-gray-50/50 sm:flex-row sm:items-center"
            >
              <div className="flex flex-col gap-1">
                <h4
                  className={`text-base font-semibold ${task.status === 'DONE' ? 'text-gray-400 line-through' : 'text-gray-900'}`}
                >
                  {task.title}
                </h4>
                {task.dueDate && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CalendarClock className="h-3.5 w-3.5" />
                    <span>
                      กำหนดส่ง:{' '}
                      {new Date(task.dueDate).toLocaleDateString('th-TH')}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={task.status}
                    onChange={e => onStatusChange(task.id, e.target.value)}
                    className={`cursor-pointer appearance-none rounded-full border px-4 py-1.5 pr-8 text-xs font-bold outline-none transition-all ${getStatusStyle(task.status)}`}
                  >
                    <option value="TODO">รอดำเนินการ</option>
                    <option value="IN_PROGRESS">กำลังทำ</option>
                    <option value="DONE">เสร็จสิ้น</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="h-3 w-3 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>

                <button
                  onClick={() => onEdit(task)}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-100 hover:text-blue-700"
                >
                  <Pencil className="h-5 w-5" />
                </button>

                <button
                  onClick={() => {
                    setIsDeleteTaskDialogOpen(true)
                  }}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isDeleteDialogOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              ยืนยันการลบหมวดหมู่
            </h3>
            <p className="text-gray-600">
              คุณต้องการลบหมวดหมู่{' '}
              <span className="font-bold text-gray-900">{title}</span>{' '}
              และงานทั้งหมดในหมวดหมู่นี้ ใช่หรือไม่?
            </p>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="btn border-none bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  onDeleteCategory(categoryId)
                  setIsDeleteDialogOpen(false)
                }}
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsDeleteDialogOpen(false)}>close</button>
          </form>
        </dialog>
      )}

      {isDeleteTaskDialogOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              ยืนยันการลบงาน
            </h3>
            <p className="text-gray-600">คุณต้องการลบงานนี้ ใช่หรือไม่?</p>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setIsDeleteTaskDialogOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="btn border-none bg-red-600 text-white hover:bg-red-700"
                onClick={() => {
                  onDelete(tasks.id)
                  setIsDeleteTaskDialogOpen(false)
                }}
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsDeleteTaskDialogOpen(false)}>
              close
            </button>
          </form>
        </dialog>
      )}
    </>
  )
}
