import AppLayout from '@/components/Layouts/App'
import DashboardLayout from '@/components/Layouts/Dashboard'
import NavbarContent from '@/components/NavbarContent'
import { deleteCategory, getCategories } from '@/services/category'
import {
  getTasks,
  updateTaskStatus,
  deleteTask,
  updateTask,
  createTask,
  getTaggedTasks,
  tagUserToTask,
} from '@/services/task'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  ListTodo,
  FolderKanban,
  CircleDashed,
  Timer,
  CheckCircle2,
  Folder,
  Users,
} from 'lucide-react'
import StatCard from '@/components/StatCard'
import CategorySection from '@/components/CategorySection/category-section'
import CreateButtonCategory from '../../components/CategorySection/create-button-category'
import { TagUserToTaskArgs } from '@/services/task/types'

export default function Dashboard() {
  const [search, setSearch] = useState('')
  const [taggingTask, setTaggingTask] = useState<any>(null)
  const [useremailToTag, setUseremailToTag] = useState('')
  const queryClient = useQueryClient()

  const [editingTask, setEditingTask] = useState<any>(null)
  const [creatingTaskInCategoryId, setCreatingTaskInCategoryId] = useState<
    string | null | undefined
  >(undefined)
  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    status: 'TODO',
    dueDate: '',
  })

  const { data: tasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(),
    refetchInterval: 2000,
  })

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    refetchInterval: 2000,
  })

  const updateStatusMutation = useMutation({
    mutationFn: ({ status, id }: { status: string; id: string }) =>
      updateTaskStatus(status, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      toast.success('ลบงานสำเร็จ')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => toast.error('ลบงานไม่สำเร็จ'),
  })

  const editTaskMutation = useMutation({
    mutationFn: (data: any) => updateTask(data, data.id),
    onSuccess: () => {
      toast.success('อัปเดตงานสำเร็จ')
      setEditingTask(null)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => toast.error('อัปเดตงานไม่สำเร็จ'),
  })

  const createTaskMutation = useMutation({
    mutationFn: (args: any) => createTask(args),
    onSuccess: () => {
      toast.success('สร้างงานสำเร็จ')
      setCreatingTaskInCategoryId(undefined)
      setNewTaskForm({ title: '', status: 'TODO', dueDate: '' })
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: () => toast.error('สร้างงานไม่สำเร็จ'),
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success('ลบหมวดหมู่สำเร็จ')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: () => toast.error('ลบหมวดหมู่ไม่สำเร็จ'),
  })

  const { data: taggedTasks, isLoading: isTaggedTasksLoading } = useQuery({
    queryKey: ['taggedTasks'],
    queryFn: () => getTaggedTasks(),
    refetchInterval: 2000,
  })

  const tagTaskMutation = useMutation({
    mutationFn: (args: TagUserToTaskArgs) => tagUserToTask(args),
    onSuccess: () => {
      toast.success('แท็กผู้ใช้กับงานสำเร็จ')
      setTaggingTask(null)
      setUseremailToTag('')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['taggedTasks'] })
    },
    onError: () => toast.error('แท็กผู้ใช้กับงานไม่สำเร็จ'),
  })

  const handleTagSubmit = () => {
    if (!useremailToTag.trim()) {
      toast.error('กรุณาระบุอีเมลผู้ใช้ที่ต้องการมอบหมาย')
      return
    }

    tagTaskMutation.mutate({
      taskId: taggingTask.id,
      email: useremailToTag.trim(),
    })
  }

  const handleCreateTaskSubmit = () => {
    if (!newTaskForm.title.trim()) {
      toast.error('กรุณากรอกชื่องาน')
      return
    }

    createTaskMutation.mutate({
      title: newTaskForm.title,
      status: newTaskForm.status,
      dueDate: newTaskForm.dueDate || null,
      categoryId: creatingTaskInCategoryId,
    })
  }

  const filteredTasks =
    tasks?.filter((task: any) =>
      task.title.toLowerCase().includes(search.toLowerCase()),
    ) || []

  const filteredTaggedTasks =
    taggedTasks?.filter((task: any) =>
      task.title.toLowerCase().includes(search.toLowerCase()),
    ) || []

  const categoriesWithTasks =
    categories?.map((category: any) => ({
      ...category,
      tasks:
        filteredTasks?.filter((task: any) => task.categoryId === category.id) ||
        [],
    })) || []

  const uncategorizedTasks =
    filteredTasks?.filter((task: any) => !task.categoryId) || []

  const totalTasks = filteredTasks?.length || 0
  const totalCategories = categories?.length || 0
  const totalTaggedTasks = filteredTaggedTasks?.length || 0

  const todoCount =
    filteredTasks?.filter((task: any) => task.status === 'TODO').length || 0
  const inProgressCount =
    filteredTasks?.filter((task: any) => task.status === 'IN_PROGRESS')
      .length || 0
  const doneCount =
    filteredTasks?.filter((task: any) => task.status === 'DONE').length || 0

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
      case 'IN_PROGRESS':
        return 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200'
      case 'DONE':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
    }
  }

  return (
    <AppLayout>
      <DashboardLayout>
        <NavbarContent search={search} onSearch={setSearch} />

        <div className="mx-4 mt-6 flex flex-col gap-6 pb-10 sm:mx-6 sm:mt-8">
          <div className="flex flex-col gap-3 rounded-lg bg-white p-6 shadow-md">
            <h1 className="text-2xl font-bold text-gray-900">ภาพรวมการทำงาน</h1>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard
                title="งานที่ได้รับมอบหมาย"
                value={totalTaggedTasks}
                icon={<Users className="h-6 w-6 text-indigo-600" />}
                bgColor="bg-indigo-50"
                isLoading={isTaggedTasksLoading}
              />
              <StatCard
                title="หมวดหมู่"
                value={totalCategories}
                icon={<FolderKanban className="h-6 w-6 text-purple-600" />}
                bgColor="bg-purple-50"
                isLoading={isCategoriesLoading}
              />
              <StatCard
                title="รอดำเนินการ"
                value={todoCount}
                icon={<CircleDashed className="h-6 w-6 text-slate-600" />}
                bgColor="bg-slate-100"
                isLoading={isTasksLoading}
              />
              <StatCard
                title="กำลังทำ"
                value={inProgressCount}
                icon={<Timer className="h-6 w-6 text-amber-600" />}
                bgColor="bg-amber-50"
                isLoading={isTasksLoading}
              />
              <StatCard
                title="เสร็จสิ้น"
                value={doneCount}
                icon={<CheckCircle2 className="h-6 w-6 text-emerald-600" />}
                bgColor="bg-emerald-50"
                isLoading={isTasksLoading}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6 pb-10">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                รายการงานของคุณ
              </h2>
              <CreateButtonCategory />
            </div>

            {filteredTaggedTasks.length > 0 && (
              <CategorySection
                title="งานที่ได้รับมอบหมาย (ถูกแท็ก)"
                tasks={filteredTaggedTasks}
                categoryId={null}
                getStatusStyle={getStatusStyle}
                onStatusChange={(id: string, status: string) =>
                  updateStatusMutation.mutate({ id, status })
                }
                onEdit={(task: any) => setEditingTask(task)}
                onDelete={(id: string) => deleteTaskMutation.mutate(id)}
                onCreate={() => setCreatingTaskInCategoryId(null)}
                onDeleteCategory={null}
                onTag={(task: any) => setTaggingTask(task)}
              />
            )}

            {uncategorizedTasks.length > 0 && (
              <CategorySection
                title="งานทั่วไป (ไม่มีหมวดหมู่)"
                tasks={uncategorizedTasks}
                categoryId={null}
                getStatusStyle={getStatusStyle}
                onStatusChange={(id: string, status: string) =>
                  updateStatusMutation.mutate({ id, status })
                }
                onEdit={(task: any) => setEditingTask(task)}
                onDelete={(id: string) => deleteTaskMutation.mutate(id)}
                onCreate={() => setCreatingTaskInCategoryId(null)}
                onDeleteCategory={null}
                onTag={(task: any) => setTaggingTask(task)}
              />
            )}

            {categoriesWithTasks.map((category: any) => (
              <CategorySection
                key={category.id}
                categoryId={category.id}
                title={category.name}
                tasks={category.tasks}
                categoryColor={category.color}
                getStatusStyle={getStatusStyle}
                onStatusChange={(id: string, status: string) =>
                  updateStatusMutation.mutate({ id, status })
                }
                onEdit={(task: any) => setEditingTask(task)}
                onDelete={(id: string) => deleteTaskMutation.mutate(id)}
                onCreate={(id: string) => setCreatingTaskInCategoryId(id)}
                onDeleteCategory={(id: string) =>
                  deleteCategoryMutation.mutate(id)
                }
                onTag={(task: any) => setTaggingTask(task)}
              />
            ))}

            {tasks?.length === 0 && (
              <div className="flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white text-gray-400">
                <Folder className="mb-3 h-10 w-10 text-gray-300" />
                <p>ยังไม่มีรายการงานในขณะนี้ เริ่มสร้างงานใหม่ได้เลย</p>
              </div>
            )}
          </div>
        </div>

        {editingTask && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="mb-4 text-lg font-bold">แก้ไขรายละเอียดงาน</h3>

              <div className="mb-3 flex flex-col gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">ชื่องาน</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={editingTask.title}
                    onChange={e =>
                      setEditingTask({ ...editingTask, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">หมวดหมู่</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={editingTask.categoryId || ''}
                    onChange={e =>
                      setEditingTask({
                        ...editingTask,
                        categoryId: e.target.value || null,
                      })
                    }
                  >
                    <option value="">งานทั่วไป (ไม่มีหมวดหมู่)</option>
                    {categories?.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() => setEditingTask(null)}
                >
                  ยกเลิก
                </button>
                <button
                  className="btn bg-[#2460E3] text-white hover:bg-blue-700"
                  onClick={() => editTaskMutation.mutate(editingTask)}
                  disabled={editTaskMutation.isPending}
                >
                  {editTaskMutation.isPending
                    ? 'กำลังบันทึก...'
                    : 'บันทึกการเปลี่ยนแปลง'}
                </button>
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setEditingTask(null)}>close</button>
            </form>
          </dialog>
        )}

        {creatingTaskInCategoryId !== undefined && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="mb-4 text-lg font-bold">สร้างงานใหม่</h3>

              <div className="mb-3 flex flex-col gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">ชื่องาน</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={newTaskForm.title}
                    placeholder="กรอกชื่องานของคุณ..."
                    onChange={e =>
                      setNewTaskForm({ ...newTaskForm, title: e.target.value })
                    }
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleCreateTaskSubmit()
                    }}
                    autoFocus
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      วันที่กำหนด
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    className="input input-bordered w-full"
                    value={newTaskForm.dueDate}
                    placeholder="กรอกวันที่กำหนด..."
                    onChange={e =>
                      setNewTaskForm({
                        ...newTaskForm,
                        dueDate: e.target.value,
                      })
                    }
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleCreateTaskSubmit()
                    }}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      สถานะเริ่มต้น
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={newTaskForm.status}
                    onChange={e =>
                      setNewTaskForm({ ...newTaskForm, status: e.target.value })
                    }
                  >
                    <option value="TODO">รอดำเนินการ</option>
                    <option value="IN_PROGRESS">กำลังทำ</option>
                    <option value="DONE">เสร็จสิ้น</option>
                  </select>
                </div>
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setCreatingTaskInCategoryId(undefined)
                    setNewTaskForm({ title: '', status: 'TODO', dueDate: '' })
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className="btn bg-[#2460E3] text-white hover:bg-blue-700"
                  onClick={handleCreateTaskSubmit}
                  disabled={createTaskMutation.isPending}
                >
                  {createTaskMutation.isPending ? 'กำลังสร้าง...' : 'เพิ่มงาน'}
                </button>
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button
                onClick={() => {
                  setCreatingTaskInCategoryId(undefined)
                  setNewTaskForm({ title: '', status: 'TODO', dueDate: '' })
                }}
              >
                close
              </button>
            </form>
          </dialog>
        )}
        {taggingTask && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="mb-4 text-lg font-bold">
                มอบหมายงาน:{' '}
                <span className="text-blue-600">{taggingTask.title}</span>
              </h3>

              <div className="mb-3 flex flex-col gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">
                      email ที่ต้องการมอบหมาย
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="กรอก email ผู้ใช้..."
                    value={useremailToTag}
                    onChange={e => setUseremailToTag(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleTagSubmit()
                    }}
                    autoFocus
                  />
                  <span className="label-text-alt mt-2 text-gray-500">
                    *ระบุ email ผู้ใช้ที่ต้องการแชร์งานนี้ให้
                  </span>
                </div>
              </div>

              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setTaggingTask(null)
                    setUseremailToTag('')
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className="btn bg-[#2460E3] text-white hover:bg-blue-700"
                  onClick={handleTagSubmit}
                  disabled={tagTaskMutation.isPending}
                >
                  {tagTaskMutation.isPending ? 'กำลังแท็ก...' : 'ยืนยันการแท็ก'}
                </button>
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button
                onClick={() => {
                  setTaggingTask(null)
                  setUseremailToTag('')
                }}
              >
                close
              </button>
            </form>
          </dialog>
        )}
      </DashboardLayout>
    </AppLayout>
  )
}
