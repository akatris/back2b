module PcopsHelper
  def is_rubric? pcop
    Pcop::type(pcop.id) == Pcop::Rubric
  end
end
