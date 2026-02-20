import { createCategory } from '@/services/category'
import { CreateCategoryArgs } from '@/services/category/types'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CreateButtonCategory() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<CreateCategoryArgs>({
    name: '',
  })

  const createCategoryMutation = useMutation({
    mutationFn: (args: CreateCategoryArgs) => createCategory(args),
    onSuccess: data => {
      toast.success('สร้างหมวดหมู่สำเร็จ')
      setOpen(false)
      setForm({
        name: '',
      })
    },
    onError: e => {
      toast.error(e?.message || 'เกิดข้อผิดพลาด')
    },
  })

  const onSubmit = () => {
    if (!form.name) {
      toast.error('กรุณากรอกชื่อหมวดหมู่')
      return
    }
    createCategoryMutation.mutate(form)
  }

  return (
    <>
      <div className="flex">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setOpen(true)}
        >
          + สร้างหมวดหมู่
        </button>
      </div>

      {open && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="mb-4 text-lg font-bold">สร้างหมวดหมู่ใหม่</h3>
            <div className="mb-3">
              <label className="label">
                <span className="label-text">
                  ชื่อหมวดหมู่ <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="เช่น งานทั่วไป"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                ยกเลิก
              </button>
              <button
                className="btn btn-primary"
                onClick={onSubmit}
                disabled={createCategoryMutation.isPending}
              >
                {createCategoryMutation.isPending ? 'กำลังสร้าง...' : 'ยืนยัน'}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  )
}
