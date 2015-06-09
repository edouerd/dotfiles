set nocompatible
filetype off

set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" let Vundle manage Vundle, required
Plugin 'gmarik/Vundle.vim'

" Plugins Begin
Plugin 'kien/ctrlp.vim'
Plugin 'tpope/vim-surround'
Plugin 'tpope/vim-commentary'
Plugin 'plasticboy/vim-markdown'
Plugin 'chriskempson/vim-tomorrow-theme'
Plugin 'reedes/vim-thematic'
Plugin 'bling/vim-airline'
Plugin 'scrooloose/syntastic'
Plugin 'valloric/YouCompleteMe'
Plugin 'airblade/vim-gitgutter'
Plugin 'raimondi/delimitMate'
Plugin 'flomotlik/vim-livereload'


" Plugins End
call vundle#end()            " required
filetype plugin indent on    " required

" Settings

set t_Co=256

" Custom Shit

let g:netrw_liststyle=3
let mapleader=" "
map <leader>k :Explore<cr>
map <Esc><Esc> :w<CR>

" Tabs
set tabstop=4 softtabstop=0 expandtab shiftwidth=2 smarttab

" Tomorrow
colorscheme Tomorrow-Night-Eighties
set number
syntax enable
set background=dark
let g:tomorrow_termcolors = 256

" Airline
let g:airline_powerline_fonts = 1
let g:airline_theme = 'tomorrow'
let g:bufferline_echo = 0
set noshowmode
set laststatus=2
set ttimeoutlen=50

" Thematic:
" let g:thematic#themes
