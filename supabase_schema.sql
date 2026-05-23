-- Crea la tabla para almacenar las reflexiones del diario
CREATE TABLE IF NOT EXISTS public.entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    date DATE NOT NULL,
    mood TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, date)
);

-- Habilita Row Level Security (RLS) para proteger los datos
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propios registros
CREATE POLICY "Users can view their own entries" 
ON public.entries FOR SELECT 
USING (auth.uid() = user_id);

-- Política: Los usuarios solo pueden insertar sus propios registros
CREATE POLICY "Users can insert their own entries" 
ON public.entries FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios solo pueden actualizar sus propios registros
CREATE POLICY "Users can update their own entries" 
ON public.entries FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios solo pueden eliminar sus propios registros
CREATE POLICY "Users can delete their own entries" 
ON public.entries FOR DELETE 
USING (auth.uid() = user_id);
