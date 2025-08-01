import { Memo } from '@/types/memo'
import { supabaseTyped } from './supabase'

export const supabaseUtils = {
  // 모든 메모 가져오기
  getMemos: async (): Promise<Memo[]> => {
    try {
      const { data, error } = await supabaseTyped
        .from('memos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading memos from database:', error)
        return []
      }

      // Database 결과를 Memo 타입으로 변환
      return data.map(memo => ({
        id: memo.id,
        title: memo.title,
        content: memo.content,
        category: memo.category,
        tags: memo.tags,
        createdAt: memo.created_at,
        updatedAt: memo.updated_at,
      }))
    } catch (error) {
      console.error('Error loading memos from database:', error)
      return []
    }
  },

  // 메모 추가
  addMemo: async (memo: Memo): Promise<Memo | null> => {
    try {
      const { data, error } = await supabaseTyped
        .from('memos')
        .insert({
          id: memo.id,
          title: memo.title,
          content: memo.content,
          category: memo.category,
          tags: memo.tags,
          created_at: memo.createdAt,
          updated_at: memo.updatedAt,
        })
        .select()
        .single()

      if (error) {
        console.error('Error adding memo to database:', error)
        console.error('Error details:', error.message, error.details, error.hint)
        return null
      }

      // Database 결과를 Memo 타입으로 변환
      return {
        id: data.id,
        title: data.title,
        content: data.content,
        category: data.category,
        tags: data.tags,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    } catch (error) {
      console.error('Error adding memo to database:', error)
      console.error('Memo data:', memo)
      return null
    }
  },

  // 메모 업데이트
  updateMemo: async (updatedMemo: Memo): Promise<Memo | null> => {
    try {
      const { data, error } = await supabaseTyped
        .from('memos')
        .update({
          title: updatedMemo.title,
          content: updatedMemo.content,
          category: updatedMemo.category,
          tags: updatedMemo.tags,
          updated_at: updatedMemo.updatedAt,
        })
        .eq('id', updatedMemo.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating memo in database:', error)
        return null
      }

      // Database 결과를 Memo 타입으로 변환
      return {
        id: data.id,
        title: data.title,
        content: data.content,
        category: data.category,
        tags: data.tags,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    } catch (error) {
      console.error('Error updating memo in database:', error)
      return null
    }
  },

  // 메모 삭제
  deleteMemo: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabaseTyped
        .from('memos')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting memo from database:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting memo from database:', error)
      return false
    }
  },

  // 특정 메모 가져오기
  getMemoById: async (id: string): Promise<Memo | null> => {
    try {
      const { data, error } = await supabaseTyped
        .from('memos')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error getting memo by ID from database:', error)
        return null
      }

      // Database 결과를 Memo 타입으로 변환
      return {
        id: data.id,
        title: data.title,
        content: data.content,
        category: data.category,
        tags: data.tags,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      }
    } catch (error) {
      console.error('Error getting memo by ID from database:', error)
      return null
    }
  },

  // 메모 검색
  searchMemos: async (query: string): Promise<Memo[]> => {
    try {
      const lowercaseQuery = query.toLowerCase()

      const { data, error } = await supabaseTyped
        .from('memos')
        .select('*')
        .or(
          `title.ilike.%${lowercaseQuery}%,content.ilike.%${lowercaseQuery}%,tags.cs.{${lowercaseQuery}}`
        )
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error searching memos in database:', error)
        return []
      }

      // Database 결과를 Memo 타입으로 변환
      return data.map(memo => ({
        id: memo.id,
        title: memo.title,
        content: memo.content,
        category: memo.category,
        tags: memo.tags,
        createdAt: memo.created_at,
        updatedAt: memo.updated_at,
      }))
    } catch (error) {
      console.error('Error searching memos in database:', error)
      return []
    }
  },

  // 카테고리별 메모 필터링
  getMemosByCategory: async (category: string): Promise<Memo[]> => {
    try {
      let query = supabaseTyped.from('memos').select('*')

      if (category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('Error getting memos by category from database:', error)
        return []
      }

      // Database 결과를 Memo 타입으로 변환
      return data.map(memo => ({
        id: memo.id,
        title: memo.title,
        content: memo.content,
        category: memo.category,
        tags: memo.tags,
        createdAt: memo.created_at,
        updatedAt: memo.updated_at,
      }))
    } catch (error) {
      console.error('Error getting memos by category from database:', error)
      return []
    }
  },

  // 모든 메모 삭제
  clearMemos: async (): Promise<boolean> => {
    try {
      const { error } = await supabaseTyped.from('memos').delete().neq('id', '00000000-0000-0000-0000-000000000000') // 모든 행 삭제

      if (error) {
        console.error('Error clearing memos from database:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error clearing memos from database:', error)
      return false
    }
  },
}