export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      anon_feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          id: number
          input: string | null
          output: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: number
          input?: string | null
          output?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: number
          input?: string | null
          output?: string | null
        }
        Relationships: []
      }
      chat: {
        Row: {
          cache_key: string | null
          created_at: string | null
          id: number
          prompt: string | null
          response: string | null
          settings: Json | null
        }
        Insert: {
          cache_key?: string | null
          created_at?: string | null
          id?: number
          prompt?: string | null
          response?: string | null
          settings?: Json | null
        }
        Update: {
          cache_key?: string | null
          created_at?: string | null
          id?: number
          prompt?: string | null
          response?: string | null
          settings?: Json | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          client_id: string | null
          created_at: string | null
          data: Json | null
          hidden: boolean | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          data?: Json | null
          hidden?: boolean | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          data?: Json | null
          hidden?: boolean | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          client_id: string | null
          created_at: string | null
          data: Json | null
          hidden: boolean | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          data?: Json | null
          hidden?: boolean | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          data?: Json | null
          hidden?: boolean | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      devour: {
        Row: {
          created_at: string | null
          data: Json | null
          email: string | null
          id: number
          prompt: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          email?: string | null
          id?: number
          prompt?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          email?: string | null
          id?: number
          prompt?: string | null
        }
        Relationships: []
      }
      dms: {
        Row: {
          author: string | null
          discovered_at: string | null
          id: number
          name: string | null
          parent_id: number | null
          text: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          discovered_at?: string | null
          id?: number
          name?: string | null
          parent_id?: number | null
          text?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          discovered_at?: string | null
          id?: number
          name?: string | null
          parent_id?: number | null
          text?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          data: Json | null
          id: number
          receivable_id: number
          type: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: number
          receivable_id: number
          type?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: number
          receivable_id?: number
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_receivable_id_fkey"
            columns: ["receivable_id"]
            referencedRelation: "receivables"
            referencedColumns: ["id"]
          }
        ]
      }
      extractions: {
        Row: {
          company_id: number | null
          created_at: string | null
          data: Json | null
          id: number
          provinence_id: number | null
          provinence_type: string | null
        }
        Insert: {
          company_id?: number | null
          created_at?: string | null
          data?: Json | null
          id?: number
          provinence_id?: number | null
          provinence_type?: string | null
        }
        Update: {
          company_id?: number | null
          created_at?: string | null
          data?: Json | null
          id?: number
          provinence_id?: number | null
          provinence_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "extractions_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "extractions_provinence_id_fkey"
            columns: ["provinence_id"]
            referencedRelation: "provinence"
            referencedColumns: ["id"]
          }
        ]
      }
      prompt_subjects: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompt_subjects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      prompts: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          label: string | null
          meta: Json | null
          subject: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: number
          label?: string | null
          meta?: Json | null
          subject?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: number
          label?: string | null
          meta?: Json | null
          subject?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prompts_subject_fkey"
            columns: ["subject"]
            referencedRelation: "prompt_subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prompts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      provinence: {
        Row: {
          company: number | null
          created_at: string | null
          file: string | null
          id: number
          type: string | null
          updated_at: string | null
        }
        Insert: {
          company?: number | null
          created_at?: string | null
          file?: string | null
          id?: number
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: number | null
          created_at?: string | null
          file?: string | null
          id?: number
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provinence_company_fkey"
            columns: ["company"]
            referencedRelation: "companies"
            referencedColumns: ["id"]
          }
        ]
      }
      receivables: {
        Row: {
          client: number
          created_at: string | null
          data: Json | null
          file: string | null
          follow_up: string | null
          id: number
          type: string | null
          updated_at: string | null
        }
        Insert: {
          client: number
          created_at?: string | null
          data?: Json | null
          file?: string | null
          follow_up?: string | null
          id?: number
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          client?: number
          created_at?: string | null
          data?: Json | null
          file?: string | null
          follow_up?: string | null
          id?: number
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "receivables_client_fkey"
            columns: ["client"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
      samples: {
        Row: {
          created_at: string | null
          id: number
          prompt_subject_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          prompt_subject_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          prompt_subject_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "samples_prompt_subject_id_fkey"
            columns: ["prompt_subject_id"]
            referencedRelation: "prompt_subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "samples_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      templates: {
        Row: {
          client_id: number | null
          created_at: string | null
          file: string | null
          id: number
          name: string | null
        }
        Insert: {
          client_id?: number | null
          created_at?: string | null
          file?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          client_id?: number | null
          created_at?: string | null
          file?: string | null
          id?: number
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "templates_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

