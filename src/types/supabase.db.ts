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
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      exercise: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          muscle_target: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id: string
          muscle_target?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          muscle_target?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      exercises: {
        Row: {
          category: Database["public"]["Enums"]["categorytype"]
          date_created: string
          equipment: Database["public"]["Enums"]["equipmenttype"] | null
          force: Database["public"]["Enums"]["forcetype"] | null
          id: string
          images: string[] | null
          instructions: string[] | null
          level: Database["public"]["Enums"]["leveltype"]
          mechanic: Database["public"]["Enums"]["mechanictype"] | null
          name: string
          primary_muscles: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles: Database["public"]["Enums"]["muscle"][] | null
        }
        Insert: {
          category: Database["public"]["Enums"]["categorytype"]
          date_created?: string
          equipment?: Database["public"]["Enums"]["equipmenttype"] | null
          force?: Database["public"]["Enums"]["forcetype"] | null
          id: string
          images?: string[] | null
          instructions?: string[] | null
          level: Database["public"]["Enums"]["leveltype"]
          mechanic?: Database["public"]["Enums"]["mechanictype"] | null
          name: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
        }
        Update: {
          category?: Database["public"]["Enums"]["categorytype"]
          date_created?: string
          equipment?: Database["public"]["Enums"]["equipmenttype"] | null
          force?: Database["public"]["Enums"]["forcetype"] | null
          id?: string
          images?: string[] | null
          instructions?: string[] | null
          level?: Database["public"]["Enums"]["leveltype"]
          mechanic?: Database["public"]["Enums"]["mechanictype"] | null
          name?: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sets: {
        Row: {
          created_at: string | null
          exercise_id: string | null
          id: string
          reps: number | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          created_at?: string | null
          exercise_id?: string | null
          id: string
          reps?: number | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: string | null
          id?: string
          reps?: number | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      split: {
        Row: {
          created_at: string | null
          id: string
          muscle_targets: string[] | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          muscle_targets?: string[] | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          muscle_targets?: string[] | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      split_exercise: {
        Row: {
          created_at: string | null
          exercise_id: string | null
          id: number
          split_id: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_id?: string | null
          id?: number
          split_id?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: string | null
          id?: number
          split_id?: string | null
        }
        Relationships: []
      }
      split_group: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          splits: string[] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          splits?: string[] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          splits?: string[] | null
          user_id?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      weight: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          user_id: string
          weight: number | null
          weight_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          user_id: string
          weight?: number | null
          weight_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          user_id?: string
          weight?: number | null
          weight_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: unknown
      }
    }
    Enums: {
      categorytype:
        | "strength"
        | "stretching"
        | "plyometrics"
        | "strongman"
        | "powerlifting"
        | "cardio"
        | "olympic weightlifting"
      equipmenttype:
        | "body only"
        | "machine"
        | "other"
        | "foam roll"
        | "kettlebells"
        | "dumbbell"
        | "cable"
        | "barbell"
        | "medicine ball"
        | "bands"
        | "exercise ball"
        | "e-z curl bar"
      forcetype: "pull" | "push" | "static"
      leveltype: "beginner" | "intermediate" | "expert"
      mechanictype: "compound" | "isolation"
      muscle:
        | "abdominals"
        | "hamstrings"
        | "adductors"
        | "quadriceps"
        | "biceps"
        | "shoulders"
        | "chest"
        | "middle back"
        | "calves"
        | "glutes"
        | "lower back"
        | "lats"
        | "triceps"
        | "traps"
        | "forearms"
        | "neck"
        | "abductors"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
